export const askAI = async (message) => {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCFKK-mmeDoD6CPkB3uMbgAhglDDWLeQKA",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};