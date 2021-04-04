import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import createStore from './redux/store';
import Planner from './components/Planner';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

const store = createStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions= {{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            height: '2rem'
          },
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name="Planner" component={Planner} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
