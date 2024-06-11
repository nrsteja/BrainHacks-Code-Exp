import React, {createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const SupermarketsContext = createContext();

const SupermarketsProvider = ({ children }) => {
    const [supermarkets, setSupermarkets] = useState([]);
    const GOOGLE_PLACES_API_KEY = 'YAIzaSyBbcOqj7cnjA-3E_VRsCFyzKjUygMGAQnU';

    return (
        <SupermarketsContext.Provider value = {{supermarkets, setSupermarkets}}>
            {children}
        </SupermarketsContext.Provider>
    )
}

export {SupermarketsContext, SupermarketsProvider};