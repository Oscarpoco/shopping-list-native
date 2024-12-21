import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

// REDUX
import { Provider } from 'react-redux';
import store from './Redux/store'; 

// SCREENS
import HomeScreen from './Screens/HomeScreen';
import ListScreen from './Screens/List';
import CreateScreen from './Screens/CreateShopping';
import ListDetailsScreen from './Screens/ListDetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Shopping list" component={ListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Create Item" component={CreateScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Details" component={ListDetailsScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
        <View style={styles.toast}>
          <Toast />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  toast: 
  {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    zIndex: 10,
    justifyContent: 'center',
    alignContent: "center",
  }
})