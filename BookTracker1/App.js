import React from "react";
import AppNavigator from "./src/components/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default App;
