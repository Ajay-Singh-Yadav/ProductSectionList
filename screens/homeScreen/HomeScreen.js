import React from 'react';
import {View} from 'react-native';
import TopBarComp from './components/TopBarComp';
import ProductListScreen from './components/ProductListScreen';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <TopBarComp />
      <ProductListScreen />
    </View>
  );
};

export default HomeScreen;
