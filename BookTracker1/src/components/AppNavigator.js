import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from './SearchPage';
import MyLibraryPage from './MyLibraryPage';
import BookDetails from './BookDetails';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Books" component={SearchPage} />
      <Stack.Screen name="My Library" component={MyLibraryPage} />
      <Stack.Screen name="Book Details" component={BookDetails} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
