// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite'; // Import SQLite

import Home from './screens/HomeScreen.js';
import Results from './screens/ResultsScreen.js';
import Welcome from './screens/WelcomeScreen.js';

const assetID = require('./assets/database/imdb.db');
const dbName = 'imdb.db'; // Define db name

export default function App() {
  const Stack = createStackNavigator();
  const [dbReady, setDbReady] = useState(false);
  const [database, setDatabase] = useState(null); // State to hold the db instance

  useEffect(() => {
    const installDB = async () => {
      console.log("Installing database ...");
      const sqliteDir = FileSystem.documentDirectory + 'SQLite';
      if (!(await FileSystem.getInfoAsync(sqliteDir)).exists) {
        await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
      }

      const dbPath = `${sqliteDir}/${dbName}`;
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

      // --- CRITICAL STEP: OPEN THE DATABASE WITH THE CORRECT SYNCHRONOUS METHOD ---
      // Use openDatabaseSync for synchronous operations, as you're using getAllSync
      const dbInstance = SQLite.openDatabaseSync(dbName);

      setDatabase(dbInstance);

      setDatabase(dbInstance);
      // --- END CRITICAL STEP ---

      setDbReady(true);
    };

    installDB().catch((err) => {
      console.error("DB install failed:", err);
      // Potentially set an error state here to show user.
    });
  }, []);

  if (!dbReady || !database) { // Check if database instance is also ready
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
        {/* Pass the database instance as a prop */}
        <Stack.Screen name="Home">
          {props => <Home {...props} db={database} />}
        </Stack.Screen>
        <Stack.Screen name="Results">
          {props => <Results {...props} db={database} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}