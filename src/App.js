import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import createStore from './redux/store';
import Planner from './components/Planner';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';

const store = createStore();
const Stack = createStackNavigator();

function App() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions= {{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            height: 80,
          },
          headerTitleStyle :{
            fontWeight: 'bold',
          }
        }}>
          <Stack.Screen name="Planner" component={Planner} options={{ title: t('planner') }} />
          <Stack.Screen name="Sign In" component={SignIn} options={{ title: t('sign in') }} />
          <Stack.Screen name="Sign Up" component={SignUp} options={{ title: t('sign up') }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
