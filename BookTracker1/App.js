import React from "react";
import AppNavigator from "./src/components/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import './i18n'; 


const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default App;
