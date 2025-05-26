import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const sharedStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414', 
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#141414', 
  },
  searchContainer: {
    marginBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A', 
    borderRadius: 8,
    marginHorizontal: 10,
    paddingRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, 
  },
  searchInput: {
    flex: 1,
    color: '#FFF', 
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#141414',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, 
  },
  sectionHeader: {
    backgroundColor: '#222222', 
    padding: 10,
    paddingLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333333',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#333333',
    marginVertical: 1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#E50914', 
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#E50914', 
    fontSize: 16,
    paddingHorizontal: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#BBBBBB', 
    fontSize: 16,
  },

  // --- NEW STYLES FOR MOVIE ITEMS ---
  movieItem: {
    backgroundColor: '#1E1E1E', 
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: '#333333', 
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 5, 
  },
  directorName: {
    fontSize: 14,
    color: '#BBBBBB', 
  },
  loadingContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: { 
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
  letterScrollerOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 15,
    borderRadius: 5,
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
    color: '#DEDEDE',
    fontWeight: '600',
  },
  activeLetter: {
    color: '#E50914',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default sharedStyles;