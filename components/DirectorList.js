import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, ScrollView, SafeAreaView,} from 'react-native';
import DirectorCard from './DirectorCard';
import sharedStyles from './styles/sharedStyles';


const normalizeLetter = (char) => {
  const mapping = {
    À: 'A', Á: 'A', Â: 'A', Ä: 'A', Å: 'A',
    Ç: 'C',
    È: 'E', É: 'E',
    Í: 'I',
    Ò: 'O', Ó: 'O', Ö: 'O', Ø: 'O',
    Ú: 'U', Ü: 'U',
    Þ: 'P', 
  };
  return mapping[char] || char;
};

const isAlphabet = (char) => /^[A-Z]$/.test(char);

const DirectorsList = ({ db }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionListRef = useRef(null);
  const [sectionData, setSectionData] = useState([]);
  const [letters, setLetters] = useState([]);
  const [activeLetter, setActiveLetter] = useState('');

  useEffect(() => {
    const allRows = db.getAllSync(`
      SELECT p.name AS director_name, COUNT(*) AS movies_directed 
      FROM people AS p 
      JOIN directors AS d ON d.person_id = p.id 
      GROUP BY p.name 
      ORDER BY director_name ASC
    `);

    // Group directors by normalized letter
    const grouped = {};

    allRows.forEach((director) => {
      const firstChar = director.director_name[0].toUpperCase();
      const normalized = normalizeLetter(firstChar);

      // Use normalized letter only if it's alphabetic, else group under '#'
      const groupKey = isAlphabet(normalized) ? normalized : '#';

      if (!grouped[groupKey]) grouped[groupKey] = [];
      grouped[groupKey].push(director);
    });

    // Convert grouped object to sorted array for SectionList
    const groupedData = Object.keys(grouped)
      .sort((a, b) => {
        if (a === '#') return 1; // put '#' (non-alpha) at end
        if (b === '#') return -1;
        return a.localeCompare(b);
      })
      .map((letter) => ({
        title: letter,
        data: grouped[letter],
      }));

    setSectionData(groupedData);
    setLetters(groupedData.map(section => section.title));
    if (groupedData.length > 0) {
      setActiveLetter(groupedData[0].title);
    }
  }, [db]);

  // Filter data by search query (inside sections)
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

  // Build a map from letter to section index for scroll syncing
  const letterToIndex = useMemo(() => {
    const map = new Map();
    filteredData.forEach((section, index) => {
      map.set(section.title, index);
    });
    return map;
  }, [filteredData]);

  const scrollToSection = (letter) => {
    const index = letterToIndex.get(letter);
    if (index !== undefined) {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        viewOffset: 0,
        animated: true,
      });
      setActiveLetter(letter);
    }
  };

  const getItemLayout = (data, index) => ({
    length: 60,
    offset: 60 * index,
    index,
  });

  const onScrollToIndexFailed = info => {
    setTimeout(() => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: info.sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }, 500);
  };

  return (
    <SafeAreaView style={sharedStyles.safeArea}>
      <View style={sharedStyles.searchContainer}>
        <TextInput
          style={sharedStyles.searchInput}
          placeholder="Search directors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={sharedStyles.mainContainer}>
        <SectionList
          ref={sectionListRef}
          sections={filteredData}
          keyExtractor={(item, index) => item.director_name + index}
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          style={sharedStyles.listContainer}
          contentContainerStyle={[sharedStyles.listContent, { paddingRight: 40 }]} // padding right so list content not hidden behind overlay
          renderItem={({ item }) => (
            <DirectorCard name={item.director_name} movieCount={item.movies_directed} db={db} />
          )}
          renderSectionHeader={({ section }) => (
            <View style={sharedStyles.sectionHeader}>
              <Text style={sharedStyles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              const firstSection = viewableItems[0].section.title;
              setActiveLetter(firstSection);
            }
          }}
          stickySectionHeadersEnabled
        />

        {/* Overlay Side Nav */}
        <View style={sharedStyles.letterScrollerOverlay}>
          <ScrollView
            contentContainerStyle={sharedStyles.letterContainer}
            showsVerticalScrollIndicator={false}
          >
            {letters.map((letter) => (
              <TouchableOpacity
                key={letter}
                onPress={() => scrollToSection(letter)}
                style={sharedStyles.letterButton}
              >
                <Text
                  style={[
                    sharedStyles.letterText,
                    letter === activeLetter && sharedStyles.activeLetter,
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DirectorsList;
