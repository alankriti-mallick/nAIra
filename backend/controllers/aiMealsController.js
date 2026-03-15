const axios = require("axios");

const generateMeals = async (req, res) => {

  const { energyLevel } = req.body;
  console.log(req.body);

  const prompt = `
Generate 3 meal suggestions for someone with ${energyLevel} energy today.
Do not return anything except JSON. Do not send null data. Suggest Indian meals and don't send single answers like Eggs.

{
 "meals":[
   {"name":"meal","prepTime":15,"reason":"short reason"},
   {"name":"meal","prepTime":20,"reason":"short reason"},
   {"name":"meal","prepTime":25,"reason":"short reason"}
 ]
}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const text = response.data.choices[0].message.content;
  console.log(response.data.choices[0].message.content);
  res.json(JSON.parse(text));

};

module.exports = { generateMeals };