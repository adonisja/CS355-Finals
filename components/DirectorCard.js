import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Chevron icons
import directorStyles from './styles/DirectorCardStyles'; // Make sure this path is correct
import sharedStyles from './styles/sharedStyles'; // Make sure this path is correct

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DirectorCard = ({ name, movieCount, db }) => {
  const [expanded, setExpanded] = useState(false);
  const [movies, setMovies] = useState([]);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!expanded) {
      // Only fetch when expanding
      const movieRows = db.getAllSync(
        `
        SELECT m.title FROM movies m
        JOIN directors d ON d.movie_id = m.id
        JOIN people p ON p.id = d.person_id
        WHERE p.name = ?
        ORDER BY m.title ASC
        `,
        [name]
      );
      setMovies(movieRows);
    }
    setExpanded(!expanded);
  };

  const getInitial = (name) => name?.[0]?.toUpperCase() || '?';

  return (
    <View
      style={directorStyles.cardWrapper}
    >
      <TouchableOpacity style={directorStyles.card} onPress={toggleExpand}>
        <View style={directorStyles.avatar}>
          <Text style={directorStyles.avatarText}>{getInitial(name)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={directorStyles.name}>{name}</Text>
          <Text style={directorStyles.count}>{movieCount} movie{movieCount !== 1 ? 's' : ''}</Text>
        </View>
        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#444"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={directorStyles.expandedContent}>
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <Text key={index} style={sharedStyles.movieItem}>
                {movie.title}
              </Text>
            ))
          ) : (
            <Text style={sharedStyles.movieItem}>No movies found.</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default DirectorCard;