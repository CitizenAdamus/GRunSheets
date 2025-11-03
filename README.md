# PDF Runsheet to CSV Converter

An application that automatically converts a PDF transportation runsheet into a specifically formatted CSV file using AI. Users can upload a PDF and download the converted CSV file, powered by the Google Gemini API.

## Features

-   **Simple API Key Entry:** Securely enter your API key directly in the app. No complex environment variable setup required.
-   **Easy PDF Upload:** Simple drag-and-drop or file selection interface.
-   **AI-Powered Conversion:** Leverages the Gemini 2.5 Pro model for intelligent and accurate data extraction from complex PDF layouts.
-   **Specific CSV Formatting:** The AI is instructed with a detailed prompt to format the output CSV according to a precise schema, including data fill-down for shared rides and abbreviation expansion.
-   **Client-Side Processing:** All operations, including the API call to Gemini, are handled directly in the browser for a fast and seamless experience.
-   **Direct CSV Download:** Download the converted data as a `.csv` file, ready for use in spreadsheets or other data-processing software.
-   **Modern & Responsive UI:** Built with React and TypeScript for a clean, intuitive, and mobile-friendly user experience.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS (via CDN)
-   **AI Model:** Google Gemini 2.5 Pro
-   **Dependencies:** `@google/genai`

## Getting Started

Follow these steps to set up and run the project locally.

### Step 1: Install Dependencies (Crucial for Code Editor)

This is the most important step to ensure your code editor (like VS Code) understands the project and doesn't show errors.

Open your terminal in the project's root directory and run:

```bash
npm install
```

**Why is this required?** This command downloads the "type definition" files for libraries like React. These files act like a dictionary for TypeScript, allowing it to provide autocompletion and error-checking in your editor. The app itself runs in the browser using files from a CDN, but your editor needs these local files to work properly.

### Step 2: Get a Gemini API Key

If you don't have one, you can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). This key is required to use the app's conversion features.

### Step 3: Run with a Live Server

Once dependencies are installed, you can run the app.
-   Right-click the `index.html` file in your editor.
-   Select "Open with Live Server" (or the equivalent option for your editor's extension).
-   This will open the application in your default web browser.

## Usage

1.  **Enter Your API Key:**
    -   When the application first loads, you will be prompted to enter your Google Gemini API key.
    -   Paste your key into the input field and click "Save & Continue".

2.  **Convert a File:**
    -   Drag and drop a PDF runsheet onto the upload area, or click to select a file.
    -   Click the "Convert to CSV" button. The process may take a minute depending on the PDF's complexity.
    -   Once the "Conversion Successful!" message appears, click the "Download CSV" button to save your file.

3.  **Reset API Key:**
    -   If you need to change your API key, click the key icon in the top-right corner of the converter screen.
