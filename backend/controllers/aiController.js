const axios = require("axios");

const generatePlan = async (req, res) => {
  try {

    const { energyLevel, tasks, meals } = req.body;

    const prompt = `
You are an AI life assistant.

Energy level today: ${energyLevel}

Tasks:
${tasks.map(t => "- " + t.title).join("\n")}

Available meals:
${meals.map(m => "- " + m.name).join("\n")}

Return ONLY valid JSON in this format:

{
  "taskPriority": [
    "task1",
    "task2",
    "task3"
  ],
  "mealSuggestion": {
    "name": "meal name",
    "reason": "short reason",
    "prepTime": "time in minutes"
  },
  "advice": "short productivity advice"
}

Do not return anything except JSON.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    const parsed = JSON.parse(aiText);

    res.json(parsed);

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI generation failed"
    });

  }
};

module.exports = { generatePlan };