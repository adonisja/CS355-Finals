import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // For responsive search input width

const sharedStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414', // Consistent with Home Screen background
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#141414', // Ensure background consistency for other screens
  },
  searchContainer: {
    marginBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row', // For search input and button
    alignItems: 'center',
    backgroundColor: '#2A2A2A', // Darker background for search bar
    borderRadius: 8,
    marginHorizontal: 10, // Consistent with card margins
    paddingRight: 10, // For the search icon button
  },
  searchInput: {
    flex: 1, // Take up available space
    color: '#FFF', // White text
    paddingHorizontal: 12,
    paddingVertical: 12, // Slightly more padding
    borderRadius: 8,
    fontSize: 16,
    // No specific marginBottom or borderWidth here, handled by container
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#141414', // Ensure list background is dark
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Ensure enough padding at bottom to scroll last items
  },
  sectionHeader: {
    backgroundColor: '#222222', // Darker background for section headers
    padding: 10, // Slightly more padding
    paddingLeft: 15, // Align with card left border
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333333',
    borderTopWidth: StyleSheet.hairlineWidth, // Top border for visual separation
    borderTopColor: '#333333',
    marginVertical: 1, // Reduce gap
  },
  sectionTitle: {
    fontSize: 19, // Slightly larger
    fontWeight: 'bold',
    color: '#E50914', // Netflix Red for section titles
  },
  movieItem: {
    paddingHorizontal: 20, // Match card padding
    paddingVertical: 10, // Consistent vertical padding
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#383838', // Darker border
    color: '#E0E0E0', // Light gray for movie titles
    fontSize: 15,
    paddingLeft: 25, // Indent for readability
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E0E0', // Consistent color
  },
  movieDetails: {
    fontSize: 14,
    color: '#B0B0B0', // Lighter color
  },
  directorName: {
    fontSize: 14,
    color: '#B0B0B0', // Lighter color
    marginTop: 2,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#E50914', // Netflix Red for error text
  },


  letterScrollerOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 35, // Slightly wider for better touch target
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent dark overlay for side nav
    paddingVertical: 15,
    borderRadius: 5, // Subtle rounded corners
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
    color: '#DEDEDE', // Lighter color for letters
    fontWeight: '600', // Slightly bolder
  },
  activeLetter: {
    color: '#E50914', // Netflix Red for active letter
    fontWeight: 'bold',
    fontSize: 16, // Slightly larger active letter
  },
});

export default sharedStyles;