const axios = require("axios");

const generatePlan = async (req, res) => {
  try {
    const energyLevel = req.body.energyLevel || [];
    const tasks = req.body.tasks || [];
    const meals = req.body.meals || [];

    const prompt = `
You are an AI life assistant.

Your job is to analyze the user's energy level, tasks, and available meals
and generate productivity insights.

Energy level today:
${energyLevel}

Tasks:
${tasks.length ? tasks.map((t) => "- " + t.title).join("\n") : "No tasks provided"}

Meals available:
${meals.length ? meals.map((m) => "- " + m.name).join("\n") : "No meals provided"}

IMPORTANT RULES:
- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations
- Do NOT include text before or after the JSON
- Do NOT wrap JSON in \`\`\`
- Do NOT return null
- timeSaved MUST be a NUMBER
- mealSuggestion MUST pick the most optimal meal from the provided meals list
- taskPriority MUST contain task names from the provided tasks list
- If tasks are empty return an empty array []
- If meals are empty still return mealSuggestion with a reasonable quick meal

Return EXACTLY this JSON structure:

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
  "advice": "short productivity advice",
  "timeSaved": 35
}

The output MUST strictly follow this schema.
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

    const text = response.data.choices[0].message.content;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let result;

    try {
      result = JSON.parse(cleaned);
    } catch (err) {
      console.error("AI JSON parse failed:", cleaned);

      result = {
        taskPriority: [],
        mealSuggestion: {
          name: "Simple Sandwich",
          reason: "Fallback meal",
          prepTime: "10",
        },
        advice: "Take things slowly today.",
        timeSaved: 10,
      };
    }

    res.json(result);
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI generation failed",
    });
  }
};

module.exports = { generatePlan };
