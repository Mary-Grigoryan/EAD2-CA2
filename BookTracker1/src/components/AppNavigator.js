import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from './SearchPage';
import MyLibraryPage from './MyLibraryPage';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Books" component={SearchPage} />
      <Stack.Screen name="My Library" component={MyLibraryPage} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
