import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import DirectorCard from './DirectorCard';
import sharedStyles from './styles/sharedStyles';
import { normalizeLetter, isAlphabet } from './utils';

const SECTION_HEADER_HEIGHT = 30;
const ESTIMATED_ROW_HEIGHT = 70;

const DirectorsList = ({ db }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionListRef = useRef(null);
  const [sectionData, setSectionDataState] = useState([]);
  const [letters, setLettersState] = useState([]);
  const [activeLetter, setActiveLetter] = useState('');
  const scrollTimeoutRef = useRef(null);
  const programmaticScrollTimeoutRef = useRef(null);
  const isProgrammaticScrollingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  const setSectionData = useCallback((data) => setSectionDataState(data), []);
  const setLetters = useCallback((data) => setLettersState(data), []);
  const setSearchQueryWrapped = useCallback((query) => setSearchQuery(query), []);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        setIsLoading(true);
        const allRows = await db.getAllSync(`
          SELECT p.id, p.name AS director_name, COUNT(*) AS movies_directed
          FROM people AS p
          JOIN directors AS d ON d.person_id = p.id
          GROUP BY p.name
          ORDER BY director_name ASC
        `);

        const grouped = {};
        allRows.forEach((director) => {
          if (director.director_name) {
            const firstChar = director.director_name[0].toUpperCase();
            const normalized = normalizeLetter(firstChar);
            const groupKey = isAlphabet(normalized) ? normalized : '#';
            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(director);
          }
        });

        const newGroupedData = Object.keys(grouped)
          .sort((a, b) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
          .map((letter) => ({ title: letter, data: grouped[letter] }));

        setSectionData(newGroupedData);
        setLetters(newGroupedData.map(section => section.title));
        if (newGroupedData.length > 0) {
          setActiveLetter(newGroupedData[0].title);
        }
      } catch (error) {
        console.error("ERROR: Error fetching directors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDirectors();

    return () => {
      clearTimeout(scrollTimeoutRef.current);
      clearTimeout(programmaticScrollTimeoutRef.current);
    };
  }, [db, setSectionData, setLetters]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return sectionData;
    return sectionData
      .map(section => ({
        ...section,
        data: section.data.filter(item =>
          item.director_name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(section => section.data.length > 0);
  }, [searchQuery, sectionData]);

  const letterToIndex = useMemo(() => {
    const map = new Map();
    filteredData.forEach((section, index) => {
      map.set(section.title, index);
    });
    return map;
  }, [filteredData]);

  const scrollToSection = useCallback((letter) => {
    Keyboard.dismiss();
    const sectionIndex = letterToIndex.get(letter);
    if (sectionIndex !== undefined && !isLoading) {
      isProgrammaticScrollingRef.current = true;

      sectionListRef.current?.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
        viewOffset: 0,
        viewPosition: 0,
      });

      setActiveLetter(letter);

      programmaticScrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollingRef.current = false;
      }, 1000);
    }
  }, [letterToIndex, isLoading]);

  const onSectionScroll = useCallback(({ viewableItems }) => {
    if (isProgrammaticScrollingRef.current) return;

    const firstVisible = viewableItems.find(item => item.isViewable && item.section);
    if (firstVisible && firstVisible.section?.title !== activeLetter) {
      setActiveLetter(firstVisible.section.title);
    }
  }, [activeLetter]);

  const onScrollToIndexFailed = useCallback((info) => {
    console.warn("FALLBACK: onScrollToIndexFailed triggered. Info:", info);
    if (!isLoading) {
      setTimeout(() => {
        sectionListRef.current?.scrollToLocation({
          sectionIndex: info.sectionIndex,
          itemIndex: 0,
          viewOffset: 0,
          animated: true,
        });
      }, 600);
    }
  }, [isLoading]);

  const getItemLayout = useCallback((data, index) => {
    let offset = 0, flatIndex = 0;
    for (let i = 0; i < data.length; i++) {
      offset += SECTION_HEADER_HEIGHT;
      flatIndex++;
      for (let j = 0; j < data[i].data.length; j++) {
        if (flatIndex === index) {
          return { length: ESTIMATED_ROW_HEIGHT, offset, index };
        }
        offset += ESTIMATED_ROW_HEIGHT;
        flatIndex++;
      }
    }
    return { length: 0, offset: 0, index };
  }, []);

  return (
    <SafeAreaView style={sharedStyles.safeArea}>
      <View style={sharedStyles.searchContainer}>
        <TextInput
          style={sharedStyles.searchInput}
          placeholder="Search directors..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQueryWrapped}
        />
      </View>

      <View style={sharedStyles.mainContainer}>
        {isLoading || filteredData.length === 0 ? (
          <View style={sharedStyles.loadingContainer}>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>No directors found.</Text>}
          </View>
        ) : (
          <SectionList
            ref={sectionListRef}
            sections={filteredData}
            keyExtractor={(item, index) => item.id?.toString() || `${item.director_name}-${index}`}
            onScrollToIndexFailed={onScrollToIndexFailed}
            style={[sharedStyles.listContainer, { paddingTop: 80 }]}
            contentContainerStyle={[sharedStyles.listContent, { paddingRight: 40 }]}
            renderItem={({ item }) => (
              <DirectorCard
                name={item.director_name}
                movieCount={item.movies_directed}
                db={db}
              />
            )}
            renderSectionHeader={({ section }) => (
              <View style={sharedStyles.sectionHeader}>
                <Text style={sharedStyles.sectionTitle}>{section.title}</Text>
              </View>
            )}
            onViewableItemsChanged={onSectionScroll}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 100,
            }}
            stickySectionHeadersEnabled={false}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={21}
            getItemLayout={getItemLayout}
          />
        )}

        {!isLoading && letters.length > 0 && (
          <View style={sharedStyles.letterScrollerOverlay}>
            <ScrollView contentContainerStyle={sharedStyles.letterContainer} showsVerticalScrollIndicator={false}>
              {letters.map((letter) => (
                <TouchableOpacity key={letter} onPress={() => scrollToSection(letter)} style={sharedStyles.letterButton}>
                  <Text style={[
                    sharedStyles.letterText,
                    letter === activeLetter && sharedStyles.activeLetter,
                  ]}>
                    {letter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DirectorsList;
