import React, {createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const SupermarketsContext = createContext();

const SupermarketsProvider = ({ children }) => {
    const [supermarkets, setSupermarkets] = useState([]);
    const [items, setItems] = useState([]);
    const GOOGLE_PLACES_API_KEY = 'YAIzaSyBbcOqj7cnjA-3E_VRsCFyzKjUygMGAQnU';

    const addMarkets = (newMarkets) => {
        setAllMarkets((prevMarkets) => {
          const combinedMarkets = [...prevMarkets];
          newMarkets.forEach((market) => {
            if (!prevMarkets.some((m) => m.name === market.name)) {
              combinedMarkets.push(market);
            }
          });
          return combinedMarkets;
        });
      };

    return (
        <SupermarketsContext.Provider value = {{supermarkets, setSupermarkets, items, setItems}}>
            {children}
        </SupermarketsContext.Provider>
    )
}

export {SupermarketsContext, SupermarketsProvider};