import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import Home from './screens/HomeScreen.js';
import Welcome from './screens/WelcomeScreen.js';
import Results from './screens/ResultsScreen.js';


/* Database file location on this project */
const assetID = require('./assets/database/imdb.db');

/* The installDB function copies database file from this project to the device */
async function installDB () {
  console.log("Installing database ...");
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync( Asset.fromModule(assetID).uri, FileSystem.documentDirectory + 'SQLite/foodProducts.db',
  ).then(({ uri }) => {
    console.log('Finished downloading to ', uri);
  }).catch(error => {
    console.error(error);
  });
}

export default function App() {
  installDB();
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitleAlign: 'center',
          animationEnabled: true,
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}  
        />       
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Results" 
          component={Results}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

