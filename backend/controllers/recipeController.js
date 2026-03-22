const axios = require("axios");

const generateRecipe = async (req, res) => {
  try {

    const { mealName, ingredients } = req.body;

    const prompt = `
You are a cooking assistant.

Generate a detailed step-by-step recipe for:

${mealName}

Available ingredients:
${ingredients.join(", ")}

Return ONLY JSON in this format:

{
  "name": "meal name",
  "prepTime": 20,
  "ingredients": ["item1", "item2"],
  "steps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "tips": "optional helpful tip"
}
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
      }
    );

    const text = response.data.choices[0].message.content;

    const cleaned = text.replace(/```json|```/g, "").trim();

    res.json(JSON.parse(cleaned));

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Recipe generation failed" });
  }
};

module.exports = { generateRecipe };