export const convertPdfToCsv = async (
  base64File: string,
  mimeType: string
): Promise<string> => {
  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64File, mimeType }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred on the server.');
    }

    const csvData = await response.text();
    return csvData;
  } catch (error) {
    console.error('Error during conversion:', error);
    throw error;
  }
};
