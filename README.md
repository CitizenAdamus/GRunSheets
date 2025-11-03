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

## Prerequisites

Before you begin, ensure you have the following:
-   A modern web browser (e.g., Chrome, Firefox, Safari).
-   A code editor with a live server extension (e.g., [Live Server for VS Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

## Getting Started

Follow these simple steps to run the project locally.

### 1. Get a Gemini API Key

If you don't have one, you can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). This key is required to use the app's conversion features.

### 2. Download or Clone the Repository

Download the project files as a ZIP or clone the repository to your local machine.

```bash
git clone <repository-url>
cd <repository-directory>
```

### 3. Open in Your Code Editor

Open the project folder in your code editor (e.g., VS Code).

### 4. Run with a Live Server

Right-click the `index.html` file and select "Open with Live Server" (or the equivalent option for your editor's extension). This will open the application in your default web browser.

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

## Project Structure

```
.
├── components/         # Reusable React components (Button, FileUpload, etc.)
│   └── icons/          # SVG icon components
├── services/           # Contains the core Gemini API logic (geminiService.ts)
├── utils/              # Utility functions (e.g., file-to-base64 conversion)
├── App.tsx             # Main application component
├── index.html          # Entry point HTML file
├── index.tsx           # React root renderer
├── package.json        # Project dependencies (for reference)
└── README.md           # This file
```
