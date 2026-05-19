import axios from "axios";

export const analyzeComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const prompt = `
You are an AI Complaint Analyzer.

Analyze this complaint and return ONLY valid JSON.

Complaint Title: ${title}
Complaint Description: ${description}
Category: ${category}

Return format:

{
  "priority": "High",
  "department": "Electricity Department",
  "summary": "Short summary",
  "response": "Professional response"
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.choices[0].message.content;

    console.log("AI RAW:", aiText);

    let parsedData;

    try {
      parsedData = JSON.parse(aiText);

      parsedData.priority =
        parsedData.priority || "Medium";

      parsedData.department =
        parsedData.department ||
        `${category} Department`;

      parsedData.summary =
        parsedData.summary ||
        `Complaint related to ${category}.`;

      parsedData.response =
        parsedData.response ||
        `Your complaint regarding ${category} has been received and our team will resolve it soon.`;
    } catch (error) {
      parsedData = {
        priority:
          category.toLowerCase() === "electricity"
            ? "High"
            : "Medium",

        department: `${category} Department`,

        summary: `Complaint related to ${category}.`,

        response: `Your complaint regarding ${category} has been received successfully and will be resolved soon.`,
      };
    }

    res.json(parsedData);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI analysis failed",
    });
  }
};