# PDF Runsheet to CSV Converter

An application that automatically converts a PDF transportation runsheet into a specifically formatted CSV file using AI. Users can upload a PDF and download the converted CSV file, powered by the Google Gemini API.

## Features

-   **Simple API Key Entry:** Securely enter your API key directly in the app.
-   **Easy PDF Upload:** Simple drag-and-drop or file selection interface.
-   **AI-Powered Conversion:** Leverages the Gemini 2.5 Pro model for intelligent and accurate data extraction.
-   **Specific CSV Formatting:** The AI is instructed with a detailed prompt to format the output CSV according to a precise schema.
-   **Direct CSV Download:** Download the converted data as a `.csv` file.
-   **Modern & Responsive UI:** Built with React and TypeScript for a clean and intuitive user experience.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Development Server:** Vite
-   **Styling:** Tailwind CSS (via CDN)
-   **AI Model:** Google Gemini 2.5 Pro
-   **Dependencies:** `@google/genai`

## Getting Started

Follow these steps to set up and run the project locally using the recommended Vite development server.

### Step 1: Install Dependencies

Open your terminal in the project's root directory and run:

```bash
npm install
```
This command installs all necessary dependencies for both the application and the local development environment.

### Step 2: Get a Gemini API Key

If you don't have one, you can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). This key is required to use the app's conversion features.

### Step 3: Run the Development Server

Once dependencies are installed, run the following command in your terminal:

```bash
npm run dev
```

Your terminal will display a local URL, typically `http://localhost:5173/`. Open this URL in your web browser to use the application. The server will automatically reload the page whenever you make changes to the code.

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