const axios = require("axios");

const generatePlan = async (req, res) => {
  try {

    const { energyLevel, tasks, meals } = req.body;

    const prompt = `
You are an AI life-load assistant.

Energy level today: ${energyLevel}

Tasks:
${tasks.map(t => "- " + t.title).join("\n")}

Meals available:
${meals.map(m => "- " + m.name).join("\n")}

Create a short daily plan:
1. Prioritize tasks
2. Suggest one meal
3. Give short productivity advice
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiResponse = response.data.choices[0].message.content;

    res.json({
      aiPlan: aiResponse
    });

  } catch (error) {

    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "AI generation failed"
    });

  }
};

module.exports = { generatePlan };