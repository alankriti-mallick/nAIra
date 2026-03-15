const axios = require("axios");

const generatePlan = async (req, res) => {
  try {
    const energyLevel = req.body.energyLevel || [];
    const tasks = req.body.tasks || [];
    const meals = req.body.meals || [];

    const prompt = `
You are an AI life assistant.

Energy level today: ${energyLevel}

Tasks:
${tasks.length ? tasks.map((t) => "- " + t.title).join("\n") : "No tasks provided"}

Meals available:
${meals.length ? meals.map((m) => "- " + m.name).join("\n") : "No meals provided"}

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

Do not return anything except JSON. Do not send null data. Suggest Indian meals and don't send single answers like Eggs.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const aiText = response.data.choices[0].message.content;

    const parsed = JSON.parse(aiText);

    res.json(parsed);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI generation failed",
    });
  }
};

module.exports = { generatePlan };
