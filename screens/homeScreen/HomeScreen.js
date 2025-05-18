import React from 'react';
import {View} from 'react-native';
import TopBarComp from './components/TopBarComp';
import ProductListScreen from './components/ProductListScreen';
import ProductCard from './components/ProductCard';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <TopBarComp />
      <ProductListScreen />
    </View>
  );
};

export default HomeScreen;
