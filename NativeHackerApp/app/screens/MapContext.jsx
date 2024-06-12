// MapContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { ALLITEMS, USERLIST } from './Lists'; // Import the user list

// Create the context
const SupermarketsContext = createContext();

const SupermarketsProvider = ({ children }) => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState(ALLITEMS);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [users, setUsers] = useState(USERLIST); // Initialize with USERLIST
  const [loggedInUser, setLoggedInUser] = useState(null);

  const addMarkets = (newMarkets) => {
    setSupermarkets((prevMarkets) => {
      const combinedMarkets = [...prevMarkets];
      newMarkets.forEach((market) => {
        if (!prevMarkets.some((m) => m.name === market.name)) {
          combinedMarkets.push(market);
        }
      });
      return combinedMarkets;
    });
  };

  const login = (email, password) => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      return true;
    } else {
      return false;
    }
  };

  return (
    <SupermarketsContext.Provider value={{ supermarkets, setSupermarkets, items, setItems, inventory, setInventory, isMapInitialized, setIsMapInitialized, selectedMarket, setSelectedMarket, loggedInUser, login }}>
      {children}
    </SupermarketsContext.Provider>
  );
};

export { SupermarketsContext, SupermarketsProvider };
