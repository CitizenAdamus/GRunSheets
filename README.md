# PDF Runsheet to CSV Converter

An application that automatically converts a PDF transportation runsheet into a specifically formatted CSV file using AI. Users can upload a PDF and download the converted CSV file, powered by the Google Gemini API.

## Features

-   **Easy PDF Upload:** Simple drag-and-drop or file selection interface.
-   **AI-Powered Conversion:** Leverages the Gemini 2.5 Pro model for intelligent and accurate data extraction from complex PDF layouts.
-   **Specific CSV Formatting:** The AI is instructed with a detailed prompt to format the output CSV according to a precise schema, including data fill-down for shared rides and abbreviation expansion.
-   **Client-Side Processing:** All operations, including the API call to Gemini, are handled directly in the browser for a fast and seamless experience.
-   **Direct CSV Download:** Download the converted data as a `.csv` file, ready for use in spreadsheets or other data-processing software.
-   **Modern & Responsive UI:** Built with React and Tailwind CSS for a clean, intuitive, and mobile-friendly user experience.

## Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI Model:** Google Gemini 2.5 Pro
-   **Dependencies:** `@google/genai`

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
-   [Node.js](https://nodejs.org/en/) (v18 or later is recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the necessary Node.js packages defined in `package.json`.

```bash
npm install
```

### 3. Configure Environment Variables (Crucial Step)

This application requires a Google Gemini API key to function. The application is coded to look for the key in the `process.env.API_KEY` environment variable.

**How to set up your key:**

1.  **Get a Gemini API Key:** If you don't have one, you can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Make the Key Available:** You must make this API key available to your local development server as an environment variable named `API_KEY`. The method for this depends on your local server setup.
    -   If you are using a tool like Vite, you can create a `.env` file in the project root and add the following line:
        ```
        API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```
    -   If you are using a generic live server extension from your code editor (like VS Code's Live Server), you may need to consult its documentation on how to load environment variables, as this is not always supported out-of-the-box. The application **will not work** without this environment variable being accessible.

## Usage

1.  **Start the Development Server:**
    The `package.json` provides a hint for running the project. Use a live server extension in your code editor (e.g., VS Code Live Server) and open the `index.html` file. Ensure your server is configured to provide the `API_KEY` environment variable as described above.

2.  **Open the Application:**
    Open your browser and navigate to the local address provided by your server (e.g., `http://localhost:5500`).

3.  **Convert a File:**
    -   Drag and drop a PDF runsheet onto the upload area, or click to select a file.
    -   Click the "Convert to CSV" button. The process may take a minute depending on the PDF's complexity.
    -   Once the "Conversion Successful!" message appears, click the "Download CSV" button to save your file.

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
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```

## License

This project is licensed under the ISC License. See the `package.json` file for details.
