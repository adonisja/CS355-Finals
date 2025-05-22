import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, SectionList, TouchableOpacity, SafeAreaView} from 'react-native';
import DirectorCard from './DirectorCard';
import directorStyles from './styles/DirectorCardStyles';

const DirectorsList = ({ db }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionListRef = useRef(null);
  const [sectionData, setSectionData] = useState([]);
  const [activeLetter, setActiveLetter] = useState('');

  useEffect(() => {
    const allRows = db.getAllSync(`
      SELECT p.name AS director_name, COUNT(*) AS movies_directed 
      FROM people AS p 
      JOIN directors AS d ON d.person_id = p.id 
      GROUP BY p.name 
      ORDER BY director_name ASC
    `);

    const groupedData = allRows.reduce((acc, director) => {
      const firstLetter = director.director_name[0].toUpperCase();
      const group = acc.find(g => g.title === firstLetter);
      if (group) {
        group.data.push(director);
      } else {
        acc.push({ title: firstLetter, data: [director] });
      }
      return acc;
    }, []);

    setSectionData(groupedData);
    if (groupedData.length > 0) {
      setActiveLetter(groupedData[0].title);
    }
  }, [db]);

  // Filtered data for search
  const filteredData = searchQuery
    ? sectionData
        .map(section => ({
          ...section,
          data: section.data.filter(item =>
            item.director_name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(section => section.data.length > 0)
    : sectionData;

  const scrollToSection = (letter) => {
    const index = filteredData.findIndex((section) => section.title === letter);
    if (index !== -1) {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        animated: true,
      });
    }
  };

  const onScrollToIndexFailed = (info) => {
    setTimeout(() => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: info.sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }, 500);
  };

  return (
    <SafeAreaView style={directorStyles.safeArea}>
      {/* Search */}
      <View style={directorStyles.searchContainer}>
        <TextInput
          style={directorStyles.searchInput}
          placeholder="Search directors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Main Content */}
      <View style={directorStyles.mainContainer}>
        <SectionList
          ref={sectionListRef}
          sections={filteredData}
          keyExtractor={(item, index) => item.director_name + index}
          renderItem={({ item }) => (
            <DirectorCard
              name={item.director_name}
              count={item.movies_directed}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={directorStyles.sectionHeader}>
              <Text style={directorStyles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          contentContainerStyle={directorStyles.listContent}
          stickySectionHeadersEnabled
          onScrollToIndexFailed={onScrollToIndexFailed}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setActiveLetter(viewableItems[0].section.title);
            }
          }}
        />

        {/* Side A–Z Scroll */}
        <ScrollView
          style={directorStyles.letterScroller}
          contentContainerStyle={directorStyles.letterContainer}
        >
          {filteredData.map((section) => (
            <TouchableOpacity
              key={section.title}
              onPress={() => scrollToSection(section.title)}
              style={directorStyles.letterButton}
            >
              <Text
                style={[
                  directorStyles.letterText,
                  section.title === activeLetter && directorStyles.activeLetter,
                ]}
              >
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DirectorsList;
