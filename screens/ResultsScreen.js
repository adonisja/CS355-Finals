import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';


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
    const allRows = db.getAllSync('SELECT m.title, r.rating, r.votes FROM movies AS m JOIN ratings AS r ON m.id = r.movie_id ORDER BY r.rating DESC');
    return (
        <View  >            
            <Text >
                Food Products Database {'\n\n'}
            </Text>            
            <Text>
                There are {allRows[0]['N']} products in the database.
            </Text>
        </View>
    );
}

const MoviesByYear = (db) => {
    const allRows = db.getAllSync('SELECT m.title AS movie_title, p.name AS director_name FROM movies AS m JOIN directors AS d ON m.id = d.movie_id JOIN people AS p ON d.person_id = p.id WHERE m.year = 2020');
    return (
        <View  >            
            <Text >
                Food Products Database {'\n\n'}
            </Text>            
            <Text>
                There are {allRows[0]['N']} products in the database.
            </Text>
        </View>
    );
}

export default function Results({ navigation, route }) {
    const db = SQLite.openDatabaseSync('imdb.db');
    const { queryType } = route.params;

    let content;
    switch (queryType) {
        case 'DirectorsList':
            content = <Text>Directors Query Selected</Text>;
            break;
        case 'TopRated':
            content = <Text>Top Rated Query Selected</Text>;
            break;
        case 'MoviesByYear':
            content = <Text>Movies By Year Query Selected</Text>;
            break;
        default:
            content = <Text>Invalid Query Type</Text>;
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            if (queryType === 'DirectorsList') {
              DirectorsList(db)
            } else if (queryType === 'TopRated') {
              TopRated(db)
            } else if (queryType === 'MoviesByYear') {
              MoviesByYear(db)
            }
        </View>
    );
};
