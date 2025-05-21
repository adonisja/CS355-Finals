import { StyleSheet } from 'react-native';

export const styles = {
  resultsScreen: StyleSheet.create({
    container: {
      paddingBottom: 30,
      backgroundColor: '#f9f9f9',
    },
  }),

  topRated: StyleSheet.create({
    sectionContainer: {
      padding: 16,
      backgroundColor: '#fff',
      marginBottom: 12,
      borderRadius: 12,
      marginHorizontal: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    movieItem: {
      marginBottom: 8,
    },
    movieText: {
      fontSize: 16,
    },
  }),

  moviesByYear: StyleSheet.create({
    sectionContainer: {
      padding: 16,
      backgroundColor: '#fff',
      marginBottom: 12,
      borderRadius: 12,
      marginHorizontal: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    yearItem: {
      marginBottom: 6,
    },
    yearText: {
      fontSize: 16,
    },
  }),

  directorsList: StyleSheet.create({
    sectionContainer: {
      flex: 1,
      paddingBottom: 20,
      paddingHorizontal: 12,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      backgroundColor: '#e0e0e0',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    directorItem: {
      backgroundColor: '#fff',
      marginVertical: 6,
      padding: 12,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      elevation: 1,
    },
    movieText: {
      fontSize: 15,
    },
    searchContainer: {
      marginBottom: 10,
    },
    searchInput: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
    },
    letterScroller: {
      position: 'absolute',
      right: 4,
      top: 40,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
    },
    letterText: {
      fontSize: 12,
      color: '#666',
      paddingVertical: 2,
    },
    listContent: {
      paddingRight: 40,
      paddingBottom: 60,
    },
  }),
};
