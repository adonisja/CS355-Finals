import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import Home from './screens/HomeScreen.js';
import Results from './screens/ResultsScreen.js';
import Welcome from './screens/WelcomeScreen.js';

const assetID = require('./assets/database/imdb.db');

export default function App() {
  const Stack = createStackNavigator();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const installDB = async () => {
      console.log("Installing database ...");
      const sqliteDir = FileSystem.documentDirectory + 'SQLite';
      if (!(await FileSystem.getInfoAsync(sqliteDir)).exists) {
        await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
      }

      const dbPath = `${sqliteDir}/imdb.db`;
      const asset = Asset.fromModule(assetID);
      await asset.downloadAsync();

      if (!(await FileSystem.getInfoAsync(dbPath)).exists) {
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: dbPath,
        });
        console.log('Database copied to: ', dbPath);
      } else {
        console.log('Database already exists at: ', dbPath);
      }

      setDbReady(true);
    };

    installDB().catch((err) => {
      console.error("DB install failed:", err);
    });
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Setting up the database...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTitleAlign: 'center',
          animationEnabled: true,
          headerStyle: { backgroundColor: '#0080ff' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' }
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
