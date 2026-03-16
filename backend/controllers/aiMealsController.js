const axios = require("axios");
const Grocery = require("../models/Grocery");

const generateMeals = async (req, res) => {
  const { energyLevel } = req.body;
  const groceries = await Grocery.find();

  const ingredients = groceries.map((g) => g.name).join(", ");
  const prompt = `
Energy level today: ${energyLevel}

Available groceries:
${ingredients}

Generate 6 indian friendly meal suggestions. Don't return single answers like just eggs. If you want you can also add non-iindian dishes.

Rules:
- If energy is LOW → quick meals (10-20 min)
- If energy is MEDIUM → moderate meals
- If energy is HIGH → more complex meals

Return JSON only in the following format!! Do not return anything other than JSON!:

{
 "meals":[
   {
     "name":"recipe name",
     "prepTime":15,
     "ingredients":["item1","item2"],
     "reason":"why this meal matches energy level"
   },
   {
     "name":"recipe name",
     "prepTime":20,
     "ingredients":["item1","item2"],
     "reason":"why this meal matches energy level"
   },
   {
     "name":"recipe name",
     "prepTime":25,
     "ingredients":["item1","item2"],
     "reason":"why this meal matches energy level"
   }
 ]
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
    },
  );

  const text = response.data.choices[0].message.content;
  res.json(JSON.parse(text));
};

module.exports = { generateMeals };
