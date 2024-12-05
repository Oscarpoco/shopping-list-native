import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import HomeScreen from './Screens/HomeScreen';

const ShoppingListScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Shopping List</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('AddItem')}>Go to Add Item</Text>
  </View>
);

const AddItemScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Add Item</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('Settings')}>Go to Settings</Text>
  </View>
);

const SettingsScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Settings</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('Home')}>Go to Home</Text>
  </View>
);

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});
