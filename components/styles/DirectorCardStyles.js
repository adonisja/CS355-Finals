import { StyleSheet } from 'react-native';

const directorStyles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#2A2A2A', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 5,
    elevation: 6, 
    overflow: 'hidden',
    borderWidth: 1, 
    borderColor: '#383838', 
  },
  card: {
    padding: 15, 
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#E50914', 
    backgroundColor: '#2A2A2A', 
  },
  avatar: {
    backgroundColor: '#E50914', 
    width: 48, 
    height: 48,
    borderRadius: 24, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, 
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20, 
  },
  name: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#FFF', 
  },
  count: {
    fontSize: 14,
    color: '#BBBBBB', 
    marginTop: 2, 
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingVertical: 10, 
    backgroundColor: '#1E1E1E', 
    borderTopWidth: StyleSheet.hairlineWidth, 
    borderTopColor: '#383838',
  },
  movieItem: { 
    paddingVertical: 8, 
    paddingHorizontal: 5, 
    color: '#F5F5F5', 
    fontSize: 16, 
    fontWeight: '500', 
  },
  noMoviesText: {
    color: '#BBBBBB', 
    fontSize: 15,
    fontStyle: 'italic',
    paddingVertical: 10,
    textAlign: 'center',
  }
});

export default directorStyles;