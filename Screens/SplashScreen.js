import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({ navigation }) => {
  const scaleValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(0);

  useEffect(() => {
    // Animate logo scaling up
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Fade in the text
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate after animation
    setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
  }, [navigation, scaleValue, fadeValue]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleValue }]
          }
        ]}>
          <MaterialIcons name="shopping-cart" size={80} color="#6C63FF" />
        </Animated.View>
        
        <Animated.View style={[
          styles.textContainer,
          {
            opacity: fadeValue
          }
        ]}>
          <Text style={styles.title}>mShop</Text>
          <Text style={styles.subtitle}>Your Smart Shopping List</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0ff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  textContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#6C63FF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default SplashScreen;