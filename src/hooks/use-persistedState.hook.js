import React from "react";

export default function usePersistedState (defaultValue,localStorageId) {
    const [persistedState, setPersistedState] = React.useState(()=>{
        const localStorageData = localStorage.getItem(localStorageId);
        return localStorageData ? JSON.parse(localStorageData) : defaultValue; 
    });

    React.useEffect(()=>{
        window.localStorage.setItem(localStorageId,JSON.stringify(persistedState));
    },[persistedState, localStorageId])  

    return [persistedState, setPersistedState];
};