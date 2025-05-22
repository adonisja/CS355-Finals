import { StyleSheet } from 'react-native';

const directorStyles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  card: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#4B9CD3',
  },
  avatar: {
    backgroundColor: '#4B9CD3',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  count: {
    fontSize: 14,
    color: '#555',
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#eaf0ff',
  },
});

export default directorStyles;
