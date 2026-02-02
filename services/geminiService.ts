// Client-side service that calls our Express API endpoint
export const sendMessageToGemini = async (message: string): Promise<{ text?: string; error?: string }> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'Request failed' };
    }

    const data = await response.json();
    return { text: data.text };
  } catch (error) {
    console.error('Chat API Error:', error);
    return { error: 'Failed to connect to server' };
  }
};