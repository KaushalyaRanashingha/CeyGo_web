import axios from "axios";

const API_KEY = "AIzaSyBrGe6fjonUNVGZL7P1kCkTlL6boK3p8no";

export const generateTravelPlan = async (data) => {
  const prompt = `
You are a travel planner AI.

Return ONLY valid JSON (no explanation).

Format:

{
  "destination": "",
  "days": [
    {
      "day": 1,
      "place": "",
      "weather": "",
      "budget": "",
      "activities": [
        {
          "time": "",
          "title": "",
          "description": "",
          "cost": ""
        }
      ]
    }
  ]
}

User Input:
Destination: ${data.destination}
Days: ${data.days}
Budget: ${data.budget}
Interests: ${data.interests}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    return res.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.log("GEMINI ERROR:", error.response?.data || error.message);
    throw error;
  }
};
