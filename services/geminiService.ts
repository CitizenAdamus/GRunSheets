import { GoogleGenAI } from "@google/genai";
import { PDFDocument } from 'pdf-lib';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;
const CHUNK_SIZE = 10; // Process 10 pages at a time

const PROMPT = `
      You are an expert data extraction and transformation tool. Your task is to analyze the provided PDF transportation runsheet and convert all the relevant data into a single, clean CSV formatted string.

      The final CSV file MUST have the following columns in this exact order:
      "Date","Run Number","Pickup Time","Customer Name","Pickup Address","Dropoff Address","Dropoff Time","Comments","Mileage"

      Follow these specific instructions for data transformation for EACH ROW of the PDF:

      ### Part 1: Date and Time Processing

      1.  **"Date" Column:**
          - Identify the main date for the runsheet, which is typically located at the top of the PDF page (e.g., "10/2/2025").
          - Apply this single date to ALL rows in the final CSV.
          - Ensure the date format in the CSV is strictly \`MM/DD/YYYY\`. For example, if a row's date in the PDF is '02.10.25', you must convert it to \`10/02/2025\` using the year from the main document date.

      2.  **"Dropoff Time" Column:**
          - Locate the dropoff time for each trip within the PDF and populate this column. This data may appear in its own column or near the dropoff address.

      ### Part 2: Data Fill-Down & Address Processing

      1.  **Data Fill-Down for Shared Rides (Crucial First Step):**
          - Before processing any other data for a row, you must check if it's part of a shared ride where data is missing.
          - A shared ride is indicated when a row has the **same "Run Number"** as the row immediately preceding it, but its own **"Pickup Time" and/or "Pickup Address" fields are blank**.
          - If these conditions are met, you **MUST copy both the "Pickup Time" AND the "Pickup Address"** from the preceding row into the current row's corresponding fields. This is a critical step to ensure data integrity for multi-passenger trips.

      2.  **"Pickup Address" Column:**
          - After applying the fill-down logic, process the "Pickup Address" field.
          - Extract ONLY the street address and city. The address is considered complete once you reach the city name.
          - Move any text that appears *after* the city name (e.g., intersection details, notes) to the "Comments" column.
          - After extracting the clean address, it is **MANDATORY** to replace any city abbreviations using the **City Mappings** below. No abbreviations are allowed in the final output.
          - **Example**: "70 LEONARD AVE, TOROTO" MUST become "70 LEONARD AVE, TORONTO".

      3.  **"Dropoff Address" Column:**
          - Perform the same extraction and mandatory mapping process as the "Pickup Address". Move any extra text to the "Comments" column.
          - **Example**: "5 PIPPIN PL, ETOBI" MUST become "5 PIPPIN PL, ETOBICOKE".

      **City Mappings (Apply to both Pickup and Dropoff Addresses):**
      - 'NORTH': 'NORTH YORK', 'SCARB': 'SCARBOROUGH', 'TOROT': 'TORONTO', 'MARKH': 'MARKHAM', 'EASTY': 'EAST YORK', 'ETOBI': 'ETOBICOKE', 'VAUGH': 'VAUGHAN', 'MISSI': 'MISSISSAUGA', 'PICKE': 'PICKERING'

      ### Part 3: The "Comments" Column

      This single column combines all notes. Construct it carefully by following these steps in order:

      1.  **Build the Pickup Comments section:**
          - Start with the label \`Pickup Comments: \`.
          - Append any text moved from the "Pickup Address" field.
          - Append the passenger count from the "Nb." column, formatted as: \` / Passengers: [value from Nb. column]\`.
          - Append the accessibility device from the "Dev." column, using the full text from the **Comment Mappings**, formatted as: \` / Device: [full device text]\`.

      2.  **Build the Dropoff Comments section:**
          - Add a separator and the label: \` / Dropoff Comments: \`.
          - Append any text moved from the "Dropoff Address" field.
          - Append the entire content from the PDF's "Drop_Off_Comments" column.

      3.  **Clean and Finalize the ENTIRE Comment String:**
          - After combining all parts, clean the entire string:
            a. Replace all newlines ('\\n', '\\r') with ' / '.
            b. Remove metadata headers like '* Building / Suite / Charac. / Note:'.
            c. Replace ' Yes / ' with a single space.
          - Finally, apply all abbreviation replacements from the **Comment Mappings** to the entire combined string.

      **Example for the "Comments" column:**
      - For a trip with "Pickup Ad": "123 MAIN ST TOROT / INTERSECTION HWY 401", "Nb.": "1", "Dev.": "KNF", "Dropoff Address": "456 OAK AVE SCARB / SIDE DOOR", and "Drop_Off_Comments": "APT BLDG / DNLU", the final "Comments" cell would be:
      "Pickup Comments: INTERSECTION HWY 401 / Passengers: 1 / Device: Non-folding Cane or Walker / Dropoff Comments: SIDE DOOR / Apartment Building / Do Not Leave Unattended"

      ### Part 4: Mappings & Final Checks

      **Comment Mappings:**
      - "DNLU": "Do Not Leave Unattended", "MAND.ESC": "Mandatory Escort / Support Person Required", "COG": "Cognitive (disability)", "APT BLDG": "Apartment Building", "MSP": "Mandatory Support Person", "FRONT ENTR": "Front Entrance", "FRONT": "Front Entrance", "CHEMO": "Chemotherapy (medical condition)", "SUP. PER": "Support Person", "SEIZ": "Seizures (medical condition)", "MAIN ENT": "Main Entrance", "EPILEPSY": "Epilepsy (medical condition)", "CX": "Customer", "P/U": "Pickup", "PU": "Pickup", "D/O": "Dropoff", "DO": "Dropoff", "SPAC": "Support Person Card", "ADP": "A Day Program", 'CANE': 'CANE', 'WALKER': 'WALKER', 'KF': 'Folding Cane or Walker', 'KNF': 'Non-folding Cane or Walker', 'WNF': 'Walker non folding'
      
      **CRITICAL FINAL CHECK:**
      - Before outputting the CSV, double-check every single row in the "Pickup Address" and "Dropoff Address" columns.
      - Confirm that ALL city abbreviations (e.g., 'TOROT', 'SCARB', 'ETOBI') have been replaced with their full names as defined in the City Mappings. This is a non-negotiable final quality check.

      **Final Output Rules:**
      - Your entire response MUST be only the CSV header row followed by the data rows.
      - Do NOT include any explanations, introductory text, or markdown formatting like \`\`\`csv or \`\`\`.
      - If a value for a specific column is not found for a row, leave it empty.
    `;

const base64ToUint8Array = (base64: string): Uint8Array => {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
};

const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

const callGeminiWithRetry = async (
  ai: GoogleGenAI,
  base64Page: string,
  mimeType: string
): Promise<string> => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: {
          parts: [
            { text: PROMPT },
            {
              inlineData: {
                data: base64Page,
                mimeType: mimeType,
              },
            },
          ],
        },
      });
      
      const text = response.text ?? '';
      return text.replace(/^```(?:csv)?\n?/, '').replace(/```$/, '').trim();

    } catch (error) {
      console.error(`Error on page conversion (attempt ${attempt + 1}/${MAX_RETRIES}):`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      const errorMessage = (lastError.message || '').toLowerCase();
      
      if (errorMessage.includes('internal') || errorMessage.includes('500')) {
        if (attempt < MAX_RETRIES - 1) {
          const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      } else {
        break;
      }
    }
  }

  const finalError = lastError || new Error('An unknown error occurred during conversion.');
  const errorMessage = (finalError.message || '').toLowerCase();
  if (errorMessage.includes('internal') || errorMessage.includes('500')) {
    throw new Error('The AI model is busy. Please try again in a moment.');
  }
  
  throw new Error('Failed to convert a page. The file may be corrupted or in an unsupported format.');
};

export const convertPdfToCsv = async (
  base64File: string,
  mimeType: string,
  onProgressUpdate: (message: string) => void
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured in your environment.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  onProgressUpdate('Loading PDF...');
  const pdfBytes = base64ToUint8Array(base64File);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDoc.getPageCount();

  if (pageCount === 0) {
    throw new Error("The PDF file is empty or corrupted.");
  }

  const csvChunkResults: string[] = [];

  for (let i = 0; i < pageCount; i += CHUNK_SIZE) {
    const startPage = i;
    const endPage = Math.min(i + CHUNK_SIZE, pageCount);
    
    onProgressUpdate(`Processing pages ${startPage + 1}-${endPage} of ${pageCount}...`);
    
    const subDocument = await PDFDocument.create();
    const pageIndices = Array.from({ length: endPage - startPage }, (_, k) => startPage + k);
    const copiedPages = await subDocument.copyPages(pdfDoc, pageIndices);
    copiedPages.forEach(page => subDocument.addPage(page));
    
    const chunkBytes = await subDocument.save();
    const chunkBase64 = uint8ArrayToBase64(chunkBytes);
    
    const chunkCsv = await callGeminiWithRetry(ai, chunkBase64, mimeType);
    if (chunkCsv) {
      csvChunkResults.push(chunkCsv);
    }
  }
  
  onProgressUpdate('Combining results...');
  
  const finalCsvLines: string[] = [];
  csvChunkResults.forEach((chunkCsv, index) => {
    const lines = chunkCsv.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return;

    if (index === 0) {
      // For the first chunk, take all lines (header + data)
      finalCsvLines.push(...lines);
    } else {
      // For subsequent chunks, skip the header row
      const headerRegex = /^"Date","Run Number"/i;
      if (headerRegex.test(lines[0])) {
        finalCsvLines.push(...lines.slice(1));
      } else {
        finalCsvLines.push(...lines);
      }
    }
  });

  if (finalCsvLines.length < 2) { // Should have at least a header and one data row
    throw new Error("Conversion resulted in empty or incomplete data. The PDF might not contain a valid runsheet.");
  }

  return finalCsvLines.join('\n');
};