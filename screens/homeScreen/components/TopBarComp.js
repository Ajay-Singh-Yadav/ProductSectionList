import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const TopBarComp = () => {
  return (
    <View style={[styles.row, {margin: 20}]}>
      <Image
        source={require('../../../assets/images/Menu.png')}
        style={{height: 30, width: 30}}
      />

      <Image
        source={require('../../../assets/images/Logo.png')}
        style={{height: 35, width: 87, marginLeft: 30}}
      />

      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../../assets/images/Search.png')}
          style={{height: 30, width: 30}}
        />
        <Image
          source={require('../../../assets/images/shoppingBag.png')}
          style={{height: 30, width: 30, marginLeft: 10}}
        />
      </View>
    </View>
  );
};

export default TopBarComp;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
  },
});
