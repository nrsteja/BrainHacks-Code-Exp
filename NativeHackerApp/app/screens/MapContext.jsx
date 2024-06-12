import React, {createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { ALLITEMS } from './Lists';

const SupermarketsContext = createContext();

const SupermarketsProvider = ({ children }) => {
    const [supermarkets, setSupermarkets] = useState([]);
    const [items, setItems] = useState([]);
    const [inventory, setInventory] = useState(ALLITEMS);
    const [isMapInitialized, setIsMapInitialized] = useState(false);
    const [selectedMarket, setSelectedMarket] = useState("");

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
        <SupermarketsContext.Provider value = {{supermarkets, setSupermarkets, items, setItems, inventory, setInventory, isMapInitialized, setIsMapInitialized, selectedMarket, setSelectedMarket}}>
            {children}
        </SupermarketsContext.Provider>
    )
}

export {SupermarketsContext, SupermarketsProvider};