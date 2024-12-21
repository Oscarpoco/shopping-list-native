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
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator>

          {/* SPLASH SCREEN */}
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

          {/* AUTHENTICATION SCREENS */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

          {/* MAIN SCREENS */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Shopping list" component={ListScreen} options={{ headerShown: false }} />

          <Stack.Screen name="Create Item" component={CreateScreen}
            options={{
              headerShown: true,
              headerTitle: 'Create',
              headerStyle: {
                backgroundColor: '#6C63FF',
              },
              headerTitleStyle: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen name="Profile" component={ProfileScreen}
            options={{
              headerShown: true,
              headerTitle: 'Profile',
              headerStyle: {
                backgroundColor: '#6C63FF',
              },
              headerTitleStyle: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen name="Details" component={ListDetailsScreen}
            options={{
              headerShown: true,
              headerTitle: 'Details',
              headerStyle: {
                backgroundColor: '#6C63FF',
              },
              headerTitleStyle: {
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                letterSpacing: 1
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>


        {/* STATUS BAR */}
        <StatusBar style="auto" />

        {/* TOAST */}
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