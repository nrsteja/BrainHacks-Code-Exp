import axios from "axios";
import { REACT_APP_OPENAI_API } from '@env';

const OPENAI_API_KEY = REACT_APP_OPENAI_API;

function generateRecipePrompt(ingredients) {
  const ingredientsList = ingredients
    .map((ingredient) => `- ${ingredient}`)
    .join("\n");
  const prompt = `Using the following ingredients:\n${ingredientsList}\n\nProvide a recipe name, a list of ingredients, and step-by-step cooking instructions. Please format the response strictly as follows:\n\nRecipe Name: [recipe name]\n\nIngredients:\n- [ingredient 1]\n- [ingredient 2]\n- ...\n\nInstructions:\n1. [step 1]\n2. [step 2]\n- ...`;
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

    // Improved extraction logic
    const recipeSections = recipeText.split(/\n\n/);

    let name = "";
    let ingredientsText = "";
    let instructionsText = "";
    
    for (const section of recipeSections) {
      if (section.startsWith("Recipe Name:")) {
        name = section.replace("Recipe Name:", "").trim();
      } else if (section.startsWith("Ingredients:")) {
        ingredientsText = section.replace("Ingredients:", "").trim();
      } else if (section.startsWith("Instructions:")) {
        instructionsText = section.replace("Instructions:", "").trim();
      }
    }

    const ingredients = ingredientsText
      .split("\n")
      .map((line) => line.replace(/^-\s*/, "").trim())
      .filter(Boolean);
    
    const instructions = instructionsText
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    return { name, ingredients, instructions };
  } catch (error) {
    console.log("Error fetching recipe from ChatGPT:", error);
    throw error;
  }
}

export { generateRecipePrompt, getRecipeFromChatGPT };