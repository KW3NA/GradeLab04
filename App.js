import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from './contexts/FormContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import Form1Screen from './screens/Form1Screen';
import Form2Screen from './screens/Form2Screen';
import Form3Screen from './screens/Form3Screen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Profile stack navigator
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={Form1Screen} />
    <Stack.Screen name="AddressDetails" component={Form2Screen} />
    <Stack.Screen name="PaymentDetails" component={Form3Screen} />
  </Stack.Navigator>
);

const App = () => (
  <UserProvider>
    <FormProvider>
      <ThemeProvider>
        <CartProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'Menu') {
                    iconName = 'home';
                  } else if (route.name === 'Cart') {
                    iconName = 'cart';
                  } else if (route.name === 'Profile') {
                    iconName = 'person';
                  }

                  // Return the appropriate icon
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Menu" component={MenuScreen} />
              <Tab.Screen name="Cart" component={CartScreen} />
              <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
          </NavigationContainer>
        </CartProvider>
      </ThemeProvider>
    </FormProvider>
  </UserProvider>
);

export default App;
