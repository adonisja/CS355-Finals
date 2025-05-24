import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import DirectorCard from './DirectorCard'; // Make sure this path is correct
import sharedStyles from './styles/sharedStyles'; // Make sure this path is correct

const { width } = Dimensions.get('window');

const normalizeLetter = (char) => {
  const mapping = {
    À: 'A', Á: 'A', Â: 'A', Ä: 'A', Å: 'A',
    Ç: 'C',
    È: 'E', É: 'E',
    Í: 'I',
    Ò: 'O', Ó: 'O', Ö: 'O', Ø: 'O',
    Ú: 'U', Ü: 'U',
    Þ: 'P',
    // Add other special characters if needed
  };
  return mapping[char] || char;
};

const isAlphabet = (char) => /^[A-Z]$/.test(char);

// --- IMPORTANT: DEFINE YOUR ACCURATE ESTIMATED ROW HEIGHTS HERE ---
// ***** YOU ABSOLUTELY MUST MEASURE AND UPDATE THESE VALUES YOURSELF! *****
// These values are CRITICAL for `getItemLayout` to correctly calculate scroll positions.
// If these are even a few pixels off, `scrollToLocation` will not land accurately.
// Use the `onLayout` method described in the steps below to get precise numbers from YOUR app.
const ESTIMATED_ROW_HEIGHT = 80; // <-- You NEED to change this to YOUR MEASURED height!
const SECTION_HEADER_HEIGHT = 46; // <-- You NEED to change this to YOUR MEASURED height!

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

  const setSectionData = useCallback((data) => {
    console.log("STATE UPDATE: setSectionData called with data.length:", data.length);
    if (data.length > 0) {
        console.log("  First section after setSectionData:", data[0]?.title, data[0]?.data.length);
    }
    setSectionDataState(data);
  }, []);

  const setLetters = useCallback((data) => {
    console.log("STATE UPDATE: setLetters called with letters.length:", data.length);
    console.log("  Letters:", data.slice(0, 5), "...", data.slice(-5));
    setLettersState(data);
  }, []);

  const setSearchQueryWrapped = useCallback((query) => {
    console.log("STATE UPDATE: setSearchQuery called with query:", query);
    setSearchQuery(query);
  }, []);


  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        setIsLoading(true);
        console.log("EFFECT: Starting fetchDirectors. DB prop:", db);
        const allRows = await db.getAllSync(`
          SELECT p.id, p.name AS director_name, COUNT(*) AS movies_directed
          FROM people AS p
          JOIN directors AS d ON d.person_id = p.id
          GROUP BY p.name
          ORDER BY director_name ASC
        `);

        console.log("DEBUG: DB Fetch Results - allRows.length:", allRows.length);
        if (allRows.length > 0) {
            console.log("DEBUG: First 5 allRows:", allRows.slice(0, 5));
        } else {
            console.log("DEBUG: No rows returned from database query.");
        }

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
          .sort((a, b) => {
            if (a === '#') return 1;
            if (b === '#') return -1;
            return a.localeCompare(b);
          })
          .map((letter) => ({
            title: letter,
            data: grouped[letter],
          }));

        setSectionData(newGroupedData);
        setLetters(newGroupedData.map(section => section.title));

        if (newGroupedData.length > 0 && newGroupedData[0]?.title) {
            setActiveLetter(newGroupedData[0].title);
        }

        console.log("DEBUG: Grouping Results - groupedData.length:", newGroupedData.length);
        console.log("DEBUG: Section Titles (letters):", newGroupedData.map(s => s.title));

      } catch (error) {
        console.error("ERROR: Error fetching directors:", error);
      } finally {
        setIsLoading(false);
        console.log("EFFECT: fetchDirectors finished. isLoading:", false);
      }
    };

    fetchDirectors();

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, [db, setSectionData, setLetters]);


  const filteredData = useMemo(() => {
    console.log("MEMO: filteredData re-calculating. searchQuery:", searchQuery, "sectionData.length:", sectionData.length);
    if (!searchQuery) return sectionData;
    const result = sectionData
      .map(section => ({
        ...section,
        data: section.data.filter(item =>
          item.director_name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(section => section.data.length > 0);
    console.log("MEMO: filteredData result.length:", result.length);
    return result;
  }, [searchQuery, sectionData]);


  const letterToIndex = useMemo(() => {
    console.log("MEMO: letterToIndex re-calculating. filteredData.length:", filteredData.length);
    const map = new Map();
    filteredData.forEach((section, index) => {
      map.set(section.title, index);
    });
    console.log("MEMO: letterToIndex map size:", map.size);
    return map;
  }, [filteredData]);


  const scrollToSection = useCallback((letter) => {
    Keyboard.dismiss();
    const sectionIndex = letterToIndex.get(letter);
    console.log(`ACTION: scrollToSection called for letter: ${letter}, sectionIndex: ${sectionIndex}`);

    if (sectionIndex !== undefined) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      isProgrammaticScrollingRef.current = true;
      if (programmaticScrollTimeoutRef.current) {
          clearTimeout(programmaticScrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (sectionListRef.current && typeof sectionListRef.current.scrollToLocation === 'function' && !isLoading) {
          console.log(`SCROLL: Attempting scrollToLocation for sectionIndex: ${sectionIndex}`);
          sectionListRef.current.scrollToLocation({
            sectionIndex: sectionIndex,
            itemIndex: 0,
            animated: true,
            viewOffset: 80,
            viewPosition: 0,
          });
          setActiveLetter(letter);
          console.log(`SCROLL: setActiveLetter called for ${letter}`);

          programmaticScrollTimeoutRef.current = setTimeout(() => {
              isProgrammaticScrollingRef.current = false;
              console.log("SCROLL: Programmatic scroll flag reset.");
          }, 1000);
        } else {
            console.warn("SCROLL: SectionList ref not ready or isLoading is true. Cannot scroll.");
            isProgrammaticScrollingRef.current = false;
        }
        scrollTimeoutRef.current = null;
      }, 350);
    }
  }, [letterToIndex, isLoading]);


  const onScrollToIndexFailed = useCallback((info) => {
    console.warn("FALLBACK: onScrollToIndexFailed triggered. Info:", info);
    if (sectionListRef.current && typeof sectionListRef.current.scrollToLocation === 'function' && !isLoading) {
        const targetSectionIndex = info.sectionIndex;
        const targetItemIndex = 0;

        setTimeout(() => {
          console.log(`FALLBACK: Attempting delayed scroll for sectionIndex: ${targetSectionIndex}`);
          sectionListRef.current?.scrollToLocation({
            sectionIndex: targetSectionIndex,
            itemIndex: targetItemIndex,
            viewOffset: 0,
            animated: true,
          });
        }, 600);
    } else {
        console.warn("FALLBACK: SectionList ref not ready for fallback or isLoading is true.");
    }
  }, [isLoading]);


  const onSectionScroll = useCallback(({ viewableItems }) => {
    if (isProgrammaticScrollingRef.current) {
        return;
    }

    if (viewableItems.length > 0) {
      const firstVisibleSection = viewableItems.find(item => item.isViewable && item.section);
      if (firstVisibleSection) {
        const currentLetter = firstVisibleSection.section.title;
        if (currentLetter !== activeLetter) {
          console.log(`VIEWABILITY: Setting activeLetter to: ${currentLetter}`);
          setActiveLetter(currentLetter);
        }
      }
    }
  }, [activeLetter]);


  // --- CRITICAL: Corrected getItemLayout for SectionList ---
  // This function tells SectionList the exact height and position of each item/header.
  // `data` here is the `sections` array (the prop passed to SectionList).
  // `index` is the "flat list index" (including headers as items).
  const getItemLayout = useCallback((data, index) => {
    let currentOffset = 0;
    let currentFlatIndex = 0;

    for (let i = 0; i < data.length; i++) {
      const section = data[i];

      if (currentFlatIndex === index) {
        return {
          length: SECTION_HEADER_HEIGHT, // Using the measured header height
          offset: currentOffset,
          index,
        };
      }
      currentOffset += SECTION_HEADER_HEIGHT;
      currentFlatIndex++;

      for (let j = 0; j < section.data.length; j++) {
        if (currentFlatIndex === index) {
          return {
            length: ESTIMATED_ROW_HEIGHT, // Using the measured row height
            offset: currentOffset,
            index,
          };
        }
        currentOffset += ESTIMATED_ROW_HEIGHT;
        currentFlatIndex++;
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
        {/* --- ADDED FOR DEBUGGING VISIBILITY --- */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'rgba(255,255,0,0.8)', padding: 5 }}>
          <Text style={{ color: 'black', fontSize: 12 }}>isLoading: {isLoading ? 'true' : 'false'}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>sectionData.length: {sectionData.length}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>filteredData.length: {filteredData.length}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>letters.length: {letters.length}</Text>
          <Text style={{ color: 'black', fontSize: 12 }}>activeLetter: {activeLetter || 'N/A'}</Text>
        </View>
        {/* --- END DEBUGGING VISIBILITY --- */}


        {isLoading || filteredData.length === 0 ? (
          <View style={sharedStyles.loadingContainer}>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text>No directors found.</Text>}
          </View>
        ) : (
          <SectionList
            ref={sectionListRef}
            sections={filteredData}
            keyExtractor={(item, index) => {
              if (item.id !== undefined && item.id !== null) {
                return item.id.toString();
              }
              return `${item.director_name || 'unknown'}-${index}`;
            }}
            onScrollToIndexFailed={onScrollToIndexFailed}
            style={[sharedStyles.listContainer, { paddingTop: 80 }]}
            contentContainerStyle={[sharedStyles.listContent, { paddingRight: 40 }]}
            renderItem={({ item }) => (
              // >>> Add onLayout to DirectorCard in your DirectorCard.js file <<<
              <DirectorCard
                name={item.director_name}
                movieCount={item.movies_directed}
                db={db}
              />
            )}
            renderSectionHeader={({ section }) => (
            <View
                style={sharedStyles.sectionHeader}
            >
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default DirectorsList;