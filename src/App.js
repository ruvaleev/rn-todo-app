import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import createStore from './redux/store';

import Home from './components/Home';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default registerRootComponent(App);
