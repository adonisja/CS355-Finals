// sharedStyles.js
import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe',
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  searchContainer: {
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainContainer: {
    flex: 1,
    position: 'relative', 
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: '#dbeafe',
    padding: 8,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  movieItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  movieDetails: {
    fontSize: 14,
    color: '#666',
  },
  directorName: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },

  
  letterScrollerOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'transparent', 
    paddingVertical: 10,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  letterText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  activeLetter: {
    color: '#1e40af',
    fontWeight: 'bold',
  },
});

export default sharedStyles;
