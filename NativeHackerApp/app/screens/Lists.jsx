export const ITEMS = [
  {
    id: "White Bread",
    name: "White Bread",
    daysLeft: 3,
    used: true,
  },
  {
    id: "Spinach",
    name: "Spinach",
    daysLeft: 1,
    used: true,
  },
  {
    id: "Milk - Gardenia",
    name: "Milk - Gardenia",
    daysLeft: 4,
    used: true,
  },
];

export const PROMOS = [
  {
    id: "1",
    name: "FairPrice",
    location: "Kampung Admiralty",
    itemsOnSale: 11,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/233402a655fce3616d5404a84b9c5cfa3816ca29d7f7e9f57002b53e34d3e79f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: "2",
    name: "ColdStorage",
    location: "Causeway Point",
    itemsOnSale: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c03b51cecc85bf286bcb805b286071226ee009e347f7e995a30b085156157c0e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: "3",
    name: "Giant",
    location: "Admiralty MRT",
    itemsOnSale: 4,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: "4",
    name: "Prime",
    location: "NTU",
    itemsOnSale: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
];

export const MARKETITEMS = [
  {
    id: "1",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b254bd1bf039ac12935f333dfbd640c1bfb0521a4bc737d57ec774cd6506e4d3?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
    name: "Multi-Grain Gardenia Bread",
    expiryDate: "03/06/2024",
    itemsOnSale: 11,
  },
  {
    id: "2",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e3e5cb1e02aafd72853d2fa55b9b788fe8db3386d5bbee3373ecec441f90af70?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
    name: "Sheng Hiong 12pc Eggs",
    expiryDate: "05/06/2024",
    itemsOnSale: 2,
  },
  {
    id: "3",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bf96492e4aea5f9f24519e0d29cd30ab101c6ef311d9d4fe6b8243d21c5a67ac?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
    name: "Marygold 1L Fresh Milk",
    expiryDate: "04/06/2024",
    itemsOnSale: 4,
  },
  {
    id: "4",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1e30ccaba9aff7fab9af50bf8cf8f9c66fd9d31982a08d87cefbf70862da467a?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
    name: "1kg Pasar Fresh Chicken",
    expiryDate: "03/06/2024",
    itemsOnSale: 11,
  },
];

export const RECIPES = [
  {
    id: "1",
    rating: 5.0,
    location: "Woodlands, Fairprice",
    name: "How to Make Italian Spaghetti at Home",
    numIng: "12 Ingredients",
    time: "40 Min",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1fea571399b7dca4a43d750fbb84c86056f125fce7b85af233e9b2576680f88b?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
  },
  {
    id: "2",
    rating: 4.7,
    location: "888 Plaza, Giant",
    name: "Simple Chicken Meal Prep",
    numIng: "10 Ingredients",
    time: "30 Min",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/dd0a5f414815ae42d16b1a6f4c9867f0336b937731b03782155550d6d775c2b2?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
  },
  {
    id: "3",
    rating: 4.7,
    location: "Kampung Admiralty FairPrice",
    name: "Japanese Fried Rice",
    numIng: "15 Ingredients",
    time: "30 Min",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6ed7fb81756cbbbed5abc99b7d9f7a475f554b35526524d9698d3ea7942de826?apiKey=59cb32cf54144d2a81842acbd6f14d63&",
  },
];

export const ALLITEMS = [
  {
    id: 1,
    name: "White Bread",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🍞",
  },
  {
    id: 2,
    name: "Eggs",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥚",
  },
  {
    id: 3,
    name: "Almonds",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🌰",
  },
  {
    id: 4,
    name: "Spinach",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🌿",
  },
  {
    id: 5,
    name: "Cabbage",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥬",
  },
  {
    id: 6,
    name: "Bananas",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🍌",
  },
  {
    id: 7,
    name: "Fresh Orange Juice",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🧃",
  },
  {
    id: 8,
    name: "Milk",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥛",
  },
  {
    id: 9,
    name: "Cheese",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🧀"
  },
  {
    id: 10,
    name: "Carrots",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥕"
  },
  {
    id: 11,
    name: "Tomatoes",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🍅"
  },
  {
    id: 12,
    name: "Lettuce",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥬"
  },
  {
    id: 13,
    name: "Chicken Breast",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🍗"
  },
  {
    id: 14,
    name: "Yogurt",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥣"
  },
  {
    id: 15,
    name: "Potatoes",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥔"
  },
  {
    id: 16,
    name: "Bell Peppers",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🌶️"
  },
  {
    id: 17,
    name: "Blueberries",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🫐"
  },
  {
    id: 18,
    name: "Broccoli",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥦"
  },
  {
    id: 19,
    name: "Peanut Butter",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥜"
  },
  {
    id: 20,
    name: "Cucumber",
    get quantity() {
      return Math.floor(Math.random() * 5) + 1; // Random number between 1 and 10
    },
    get daysLeftNumber() {
      return Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    },
    get daysLeft() {
      return `${this.daysLeftNumber} days`;
    },
    emoji: "🥒"
  }
];


// list.jsx
export const USERLIST = [
  {
    name: 'John Doe',
    email: 'John.doe@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'Jane.smith@example.com',
    password: 'Password456'
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password789'
  },
  {
    name: 'Bob Brown',
    email: 'Bob.brown@example.com',
    password: 'password101'
  }
];



function Lists() {}

export default Lists;
