import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from './SearchPage';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Books" component={SearchPage} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
