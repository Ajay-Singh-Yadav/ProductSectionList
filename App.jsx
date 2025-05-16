import React from 'react';
import {View} from 'react-native';
import HomeScreen from './screens/homeScreen/HomeScreen';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <HomeScreen />
      </View>
    </Provider>
  );
};

export default App;
