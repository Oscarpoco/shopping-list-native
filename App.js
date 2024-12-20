import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './Redux/store'; 

// SCREENS
import HomeScreen from './Screens/HomeScreen';
import ListScreen from './Screens/List';
import CreateScreen from './Screens/CreateShopping';
import ListDetailsScreen from './Screens/ListDetailsScreen';

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
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Shopping list" component={ListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Create Item" component={CreateScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Details" component={ListDetailsScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}