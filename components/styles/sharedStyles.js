import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  container: {
    flex: 1,
    paddingTop: 8,
  },
  searchContainer: {
    padding: 12,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mainContainer: {
    flex: 1,
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
  letterScrollerOverlay: {
    position: 'absolute',
    right: 0,
    top: 70, 
    bottom: 0,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.15)', 
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    zIndex: 10,
  },
  letterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  letterButton: {
    paddingVertical: 4,
  },
  letterText: {
    fontSize: 14,
    color: '#555',
  },
  activeLetter: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    textDecorationLine: 'underline',
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
});

export default sharedStyles;
