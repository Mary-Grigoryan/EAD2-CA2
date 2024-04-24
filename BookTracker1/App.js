import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import SearchPage from './src/components/SearchPage';

const App = () => {
    return (
        <NavigationContainer>
            <SearchPage />
        </NavigationContainer>
    );
};

export default App;