import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import createStore from './redux/store';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const store = createStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Sign In" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
