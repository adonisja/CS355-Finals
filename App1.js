import React from 'react';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import {View,Text,FlatList} from 'react-native';

import WelcomeScreen from './screens/WelcomeScreen.js';
import ResultsScreen from './screens/ResultsScreen.js';
import HomeScreen from './screens/HomeScreen.js';

/* Database file location on this project */
const assetID = require('./assets/chinook.db');

/* The installDB function copies the database file from this project to the device */
async function installDB () {
  console.log("Installing database ...");
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync( Asset.fromModule(assetID).uri,
                                  FileSystem.documentDirectory + 'SQLite/chinook.db', 
  ).then(({ uri }) => { console.log('Finished downloading to ', uri); }
  ).catch(error => { console.error(error); });
}

/* App main function: install the db, run SQL query, and display results in a FlatList */
export default function App() {
  installDB();  // Calls our installDB function to install the database on the device 

  /* Open the database. 
  Note: SQLite.openDatabaseSync is a synchronous function and should be used only in the 
  main thread. If you want to use it in a background thread, use SQLite.openDatabaseAsync 
  and make sure to await the result. */
  const db = SQLite.openDatabaseSync('chinook.db');

  /* Run SQL query on the db. 
  Note: The SQL query is a string and should be written in the same way as in SQLite.
  The query returns an array of objects, where each object represents a row in the result set. */
  console.log("Running SQL query ...");
  const allRows = db.getAllSync('SELECT * FROM albums');
  console.log(allRows.length + " rows return ...");
  
  /* The FlatList component is used to display all the objects in the allRows array */ 
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <FlatList   
        data = {allRows}
        renderItem = { ({item}) => 
                      <Text style={{fontSize:16}}> {item.Title} | {item.ArtistId} </Text> } 
        keyExtractor = {(item, index) => index.toString()}
        style = {{width:'100%', padding:20, backgroundColor:'#abdbe3'}}
      />
    </View> );
}