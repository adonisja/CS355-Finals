// styles/MovieCardStyles.js
import { StyleSheet } from 'react-native';

const movieCardStyles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: '#E50914',
  },
  bestOfBestCardWrapper: {
    borderLeftColor: '#FFD700',
    backgroundColor: '#3D2F00',
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  ratingBadge: {
    backgroundColor: '#E50914',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FF0000',
  },
  bestOfBestRatingBadge: {
    backgroundColor: '#FFD700',
    borderColor: '#FFA500',
  },
  ratingText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bestOfBestIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'transparent',
    padding: 2,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  directorName: {
    fontSize: 13,
    color: '#BBBBBB',
    marginBottom: 2, 
    fontStyle: 'italic',
  },
  actorNames: { 
    fontSize: 12, 
    color: '#CCCCCC', 
    marginBottom: 6, 
    fontStyle: 'italic',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  starIcon: {
    marginHorizontal: 1,
  },
  votesText: {
    fontSize: 14,
    color: '#BBBBBB',
  },
});

export default movieCardStyles;