import {View, Text, Image} from 'react-native';
import React from 'react';
import {FontAwesome, MaterialIcons, Entypo} from 'react-native-vector-icons';

const ProductCard = () => {
  return (
    <View className="bg-white rounded-2xl p-4 m-4 shadow-md">
      {/* Image Section */}
      <View className="flex-row">
        <Image
          source={require('../../../assets/images/m.jpg')} // Place your image in assets
          className="w-28 h-36 rounded-xl"
          resizeMode="contain"
        />

        {/* Product Info */}
        <View className="flex-1 pl-4 justify-between">
          <Text className="text-base font-semibold text-gray-800">
            Motorola g45 5G (Brilliant Blue, 128 GB)
          </Text>

          {/* Ratings */}
          <View className="flex-row items-center mt-1">
            <FontAwesome name="star" size={14} color="#FFD700" />
            <FontAwesome name="star" size={14} color="#FFD700" />
            <FontAwesome name="star" size={14} color="#FFD700" />
            <FontAwesome name="star" size={14} color="#FFD700" />
            <FontAwesome name="star-half" size={14} color="#FFD700" />
            <Text className="ml-1 text-gray-500 text-sm">(1,54,058)</Text>
          </View>

          {/* Price Section */}
          <View className="mt-2">
            <Text className="text-green-600 font-bold text-sm">20% off</Text>
            <View className="flex-row items-center space-x-2">
              <Text className="line-through text-gray-400">₹14,999</Text>
              <Text className="text-lg font-bold text-black">₹11,999</Text>
            </View>
            <Text className="text-blue-600 text-sm mt-1">
              ₹10,999 <Text className="text-xs">with Bank offer</Text>
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              Upto ₹8,400 Off on Exchange
            </Text>
          </View>

          {/* Delivery & Warranty */}
          <View className="flex-row items-center mt-2">
            <Entypo name="rocket" size={16} color="black" />
            <Text className="ml-1 text-sm text-black">
              Express 2 day delivery
            </Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1">
            1 year warranty by MOTOROLA
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
