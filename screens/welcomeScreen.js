import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    // Refs for animation values
    const fadeAnim = useRef(new Animated.Value(0)).current; // For fade in effect
    const pulseAnim = useRef(new Animated.Value(1)).current; // For button pulse effect

    useEffect(() => {
        // Fade in animation for text and button
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000, // Duration of the fade-in
                easing: Easing.ease,
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();

        // Pulse animation for the button
        const pulseLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05, // Slightly larger scale
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1, // Back to original scale
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        pulseLoop.start();

        // Clean up animation on component unmount
        return () => pulseLoop.stop();
    }, [fadeAnim, pulseAnim]);

    return (
        <ImageBackground
            source={require('../assets/image/welcome.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
                style={styles.overlay}
            >
                <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>Welcome to</Text>
                    <Text style={[styles.title, styles.mainTitle]}>IMDB Director Query App</Text>
                    <Text style={styles.subtitle}>By Nathan Hilliard and Akkeem Tyrell</Text>

                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.buttonText}>Press to Start!</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    mainTitle: {
        fontSize: 32,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#DEDEDE',
        textAlign: 'center',
        marginBottom: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 2,
    },
    button: {
        backgroundColor: '#E50914',
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});