
export const convertPdfToCsv = async (
  base64File: string,
  mimeType: string
): Promise<string> => {
  const response = await fetch('/api/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base64File, mimeType }),
  });

  if (!response.ok) {
    // Try to parse a JSON error message from the serverless function
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An unknown error occurred on the server.');
    } catch (e) {
      // If the body is not JSON or there's another issue, throw a generic error
      throw new Error(`Server responded with status ${response.status}: ${response.statusText}`);
    }
  }

  // The response from the serverless function is the raw CSV text
  return response.text();
};
