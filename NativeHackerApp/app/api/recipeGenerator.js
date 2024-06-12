import axios from "axios";
import { REACT_APP_OPENAI_API } from '@env';
const OPENAI_API_KEY =
  REACT_APP_OPENAI_API;

function generateRecipePrompt(ingredients) {
  const ingredientsList = ingredients
    .map((ingredient) => `- ${ingredient}`)
    .join(", ");
  const prompt = `Using a subset of the following ingredients:\n${ingredientsList}\n\nProvide a recipe name, a list of ingredients, and step-by-step cooking instructions. Please format the response as follows:\n\nRecipe Name: [recipe name]\n\nIngredients:\n- [ingredient 1]\n- [ingredient 2]\n- ...\n\nInstructions:\n1. [step 1]\n2. [step 2]\n- ...`;
  return prompt;
}

async function getRecipeFromChatGPT(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-16k", // Using gpt-3.5-turbo-16k model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const recipeText = response.data.choices[0].message.content.trim();

    // Extracting the recipe name, ingredients, and instructions
    const [_, name, ingredientsText, instructionsText] = recipeText.match(
      /Recipe Name:\s*(.*?)\n\nIngredients:\s*((?:-.*\n?)*)\n\nInstructions:\s*((?:\d\..*\n?)*)/s
    );

    const ingredients = ingredientsText
      .trim()
      .split("\n")
      .map((line) => line.slice(2));
    const instructions = instructionsText
      .trim()
      .split("\n")
      .map((line) => line.slice(3));

    return { name, ingredients, instructions };
  } catch (error) {
    console.error("Error fetching recipe from ChatGPT:", error);
    throw error;
  }
}

export { generateRecipePrompt, getRecipeFromChatGPT };