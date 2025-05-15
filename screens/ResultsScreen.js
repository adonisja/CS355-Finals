import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';


// const DirectorsList = (db) => {
//     const allRows = db.getAllSync(`SELECT p.name AS director_name, COUNT(*) AS movies_directed
//         FROM people AS p 
//         JOIN directors AS d ON d.person_id = p.id 
//         GROUP BY p.name 
//         ORDER BY movies_directed DESC`);
//     const directors=[];
//     allRows.forEach((row) => {
//         directors.push(row);
//     });
//     return (
//         <View>
//             <FlatList 
//                 data={allRows}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                 <Text>{item.director_name} | {item.movies_directed}</Text>
//                  )}
//             />
//         </View>
//     );
// }

const DirectorsList = (db) => {
    const allRows = db.getAllSync('SELECT p.name AS director_name, COUNT(*) AS movies_directed FROM people AS p JOIN directors AS d ON d.person_id = p.id GROUP BY p.name ORDER BY movies_directed DESC');
    const directors=[];
    allRows.forEach((row) => {
        directors.push(row);
    });
    return (
        <View>
           <FlatList 
                renderItem={({item}) => <Text> {item.director_name} | {item.movies_directed} </Text>}
                data={directors}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const TopRated = (db) => {
  const allRows = db.getAllSync(`
    SELECT m.title, r.rating, r.votes 
    FROM movies AS m 
    JOIN ratings AS r ON m.id = r.movie_id 
    ORDER BY r.rating DESC
  `);
    const toprated=[];
    allRows.forEach((row) => {
        toprated.push(row);
    });
  return (
    <FlatList 
      data={allRows}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text>{item.title} | Rating: {item.rating} | Votes: {item.votes}</Text>
      )}
    />
  );
};

const MoviesByYear = (db) => {
  const allRows = db.getAllSync(`
    SELECT m.title AS movie_title, p.name AS director_name 
    FROM movies AS m 
    JOIN directors AS d ON m.id = d.movie_id 
    JOIN people AS p ON d.person_id = p.id 
    WHERE m.year = 2020
  `);

  return (
    <FlatList 
      data={allRows}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text>{item.movie_title} | Director: {item.director_name}</Text>
      )}
    />
  )
};

export default function Results({ route }) {
  const db = SQLite.openDatabaseSync('imdb.db');
  const { queryType } = route.params;
  console.log(`queryType: ${queryType}`)

  let content;
  switch (queryType) {
    case 'DirectorsList':
      content = DirectorsList(db);
      break;
    case 'TopRated':
      content = TopRated(db);
      break;
    case 'MoviesByYear':
      content = MoviesByYear(db);
      break;
    default:
      content = <Text>Invalid queryType</Text>;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
