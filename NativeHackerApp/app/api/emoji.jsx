import React from "react";

export const getEmojiForItem = (itemName) => {
  const lowerName = itemName.toLowerCase();
  const emojiMap = {
    bread: "🍞",
    egg: "🥚",
    milk: "🥛",
    butter: "🧈",
    "peanut butter": "🥜",
    "dragon fruit": "🐉",
    apple: "🍎",
    greenapple: "🍏",
    pineapple: "🍍",
    banana: "🍌",
    grape: "🍇",
    orange: "🍊",
    watermelon: "🍉",
  };
  //Hello!

  return Object.keys(emojiMap).find((key) => lowerName.includes(key))
    ? emojiMap[lowerName]
    : "🛒";
};

export const generateEmojiForItem = async (itemName) => {
  const emojiFromList = getEmojiForItem(itemName);
  if (emojiFromList !== "🛒") {
    return emojiFromList;
  }

  const API_KEY = "WWefpee1V8CnIEPVACBWmg==0ZKBI8hZKGqvHZFE";
  const url = `https://api.api-ninjas.com/v1/emoji?name=${itemName}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch emoji");
    }
    const data = await response.json();
    //console.log(data[0].character);
    return data[0].character;
  } catch (error) {
    console.error("Error fetching emoji:", error);
    return "🛒";
  }
};
