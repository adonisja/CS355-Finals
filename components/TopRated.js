// TopRated.js
import React, { useState, useEffect } from 'react'; // Removed useCallback as it's no longer strictly needed without executeSqlPromise
import { SectionList, Text, View, ActivityIndicator, Platform } from 'react-native';
import sharedStyles from './styles/sharedStyles.js';
import MovieCard from './MovieCard.js';

const TopRated = ({ db }) => {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      if (!db) {
        console.warn('LOG: TopRated fetchTopRatedMovies - db prop is not yet available.');
        setIsLoading(true);
        return;
      }

      setIsLoading(true);
      try {
        console.log("LOG: TopRated: Attempting to fetch movies using getAllAsync...");
        const allMovies = await db.getAllAsync(`
          SELECT
            m.id, m.title, r.rating, r.votes,
            p_director.name AS director_name,
            GROUP_CONCAT(p_actor.name, ', ') AS actor_names
          FROM movies AS m
          JOIN ratings AS r ON m.id = r.movie_id
          LEFT JOIN directors AS d ON m.id = d.movie_id
          LEFT JOIN people AS p_director ON d.person_id = p_director.id
          LEFT JOIN stars AS sim ON m.id = sim.movie_id         -- Corrected to use 'stars' table
          LEFT JOIN people AS p_actor ON sim.person_id = p_actor.id
          GROUP BY m.id
          ORDER BY r.rating DESC, r.votes DESC;
        `);
        console.log("LOG: TopRated: Successfully fetched movies.", allMovies.length);

        const bestOfBest = allMovies.filter(movie => movie.rating === 10.0 && movie.votes > 50);
        const otherTopRated = allMovies.filter(movie => !(movie.rating === 10.0 && movie.votes > 50));

        const newSections = [];
        if (bestOfBest.length > 0) {
          newSections.push({ title: '⭐ Best of the Best ⭐', data: bestOfBest, isBestOfBestSection: true });
        }
        if (otherTopRated.length > 0) {
          newSections.push({ title: 'Top Rated Movies', data: otherTopRated, isBestOfBestSection: false });
        }

        setSections(newSections);
        console.log(`LOG: Fetched movies. Best of Best: ${bestOfBest.length}, Other Top Rated: ${otherTopRated.length}`);
      } catch (error) {
        console.error('ERROR: Query error in fetchTopRatedMovies:', error);
        setSections([]); // Clear sections on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [db]); // Dependency remains 'db'

  if (isLoading || !db) {
    return (
      <View style={sharedStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={sharedStyles.loadingText}>Loading top rated movies...</Text>
      </View>
    );
  }

  if (sections.length === 0) {
    return <Text style={sharedStyles.emptyMessage}>No top rated movies found.</Text>;
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item.title}-${item.id}-${index}`}
      renderItem={({ item, section }) => (
        <MovieCard
          title={item.title}
          rating={item.rating}
          votes={item.votes}
          directorName={item.director_name}
          actorNames={item.actor_names}
          isBestOfBest={section.isBestOfBestSection}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={sharedStyles.sectionHeader}>
          <Text style={[
            sharedStyles.sectionTitle,
            section.isBestOfBestSection && sharedStyles.bestOfBestTitle
          ]}>
            {section.title}
          </Text>
        </View>
      )}
      contentContainerStyle={sharedStyles.listContent}
      style={sharedStyles.listContainer}
    />
  );
};

export default TopRated;