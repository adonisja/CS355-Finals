import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import movieCardStyles from './styles/MovieCardStyles.js';

const MovieCard = ({ title, rating, votes, directorName, actorNames, isBestOfBest = false }) => {
  const renderStars = (score) => {
    const fullStars = Math.floor(score / 2);
    const halfStar = (score / 2) % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={movieCardStyles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome5 key={`full-${i}`} name="star" solid size={14} color="#FFD700" style={movieCardStyles.starIcon} />
        ))}
        {halfStar && <FontAwesome5 name="star-half-alt" solid size={14} color="#FFD700" style={movieCardStyles.starIcon} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesome5 key={`empty-${i}`} name="star" size={14} color="#B0B0B0" style={movieCardStyles.starIcon} />
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        movieCardStyles.cardWrapper,
        isBestOfBest && movieCardStyles.bestOfBestCardWrapper
      ]}
      onPress={() => console.log(`Tapped on movie: ${title}`)}
    >
      <View style={movieCardStyles.cardContent}>
        <View style={[
          movieCardStyles.ratingBadge,
          isBestOfBest && movieCardStyles.bestOfBestRatingBadge
        ]}>
          <Text style={movieCardStyles.ratingText}>{rating.toFixed(1)}</Text>
          {isBestOfBest && <FontAwesome5 name="crown" solid size={14} color="#FFF" style={movieCardStyles.bestOfBestIcon} />}
        </View>

        <View style={movieCardStyles.detailsContainer}>
          <Text style={movieCardStyles.title}>{title}</Text>
          {directorName && (
            <Text style={movieCardStyles.directorName}>Directed by: {directorName}</Text>
          )}
          {actorNames && actorNames.length > 0 && (
            <Text style={movieCardStyles.actorNames}>Starring: {actorNames}</Text>
          )}
          {/* Combined votes and stars into one infoRow */}
          <View style={movieCardStyles.infoRow}>
            {renderStars(rating)}
            <Text style={movieCardStyles.votesText}>({votes.toLocaleString()} votes)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;