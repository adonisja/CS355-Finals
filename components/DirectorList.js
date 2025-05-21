import React, { useState, useRef } from 'react';
import {
  View, Text, SectionList, TextInput, TouchableOpacity
} from 'react-native';
import { styles } from '../ResultScreenStyle';

const DirectorsList = ({ data = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionListRef = React.useRef(null);
  const grouped = data.reduce((acc, director) => {
    const firstLetter = director.director_name[0].toUpperCase();
    const group = acc.find(g => g.title === firstLetter);
    if (group) {
      group.data.push(director);
    } else {
      acc.push({ title: firstLetter, data: [director] });
    }
    return acc;
  }, []);
  const letters = grouped.map(g => g.title);
  const [activeLetter, setActiveLetter] = useState(letters[0] || '');

  const filtered = searchQuery
    ? grouped
        .map(g => ({
          ...g,
          data: g.data.filter(d =>
            d.director_name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(g => g.data.length > 0)
    : grouped;

  const scrollToSection = (index) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TextInput
        placeholder="Search directors..."
        placeholderTextColor="#aaa"
        style={styles.directorsList.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.directorsList.container}>
        <SectionList
          ref={sectionListRef}
          sections={filtered}
          keyExtractor={(item, index) => item.director_name + index}
          renderItem={({ item }) => (
            <View style={styles.directorsList.item}>
              <Text style={styles.directorsList.name}>{item.director_name}</Text>
              <Text style={styles.directorsList.count}>{item.movies_directed} 🎬</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.directorsList.header}>
              <Text style={styles.directorsList.headerText}>{section.title}</Text>
            </View>
          )}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setActiveLetter(viewableItems[0].section.title);
            }
          }}
        />
        <ScrollView style={styles.directorsList.scroller}>
          {letters.map((l, i) => (
            <TouchableOpacity key={l} onPress={() => scrollToSection(i)}>
              <Text style={[
                styles.directorsList.letter,
                activeLetter === l && styles.directorsList.activeLetter
              ]}>
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default DirectorsList;
