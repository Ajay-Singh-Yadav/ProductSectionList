import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
  ScrollView,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {fetchPosts, resetPosts} from '../../../store/slice/postsSlice';
import {useSelector, useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductListScreen = () => {
  // const {items, loading, error} = useSelector(state => state.posts);

  const {items, loading, error, skip, hasMore} = useSelector(
    state => state.posts,
  );
  const dispatch = useDispatch();

  const [searchedText, setSearchedText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sectionData, setSectionData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchPosts(0));
  }, [dispatch]);

  const groupByCategory = items => {
    const grouped = {};

    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return Object.keys(grouped).map(category => ({
      title: category,
      data: grouped[category],
    }));
  };

  const categories = [...new Set(items.map(item => item.category))];

  useEffect(() => {
    let filtered = items;
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchedText.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchedText.toLowerCase()),
      );
    }
    setSectionData(groupByCategory(filtered));
  }, [searchedText, items, selectedCategory]);

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(resetPosts());
    const randomSkip = Math.floor(Math.random() * 60); // Ensure different results
    await dispatch(fetchPosts(randomSkip));
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPosts(skip));
    }
  };

  return (
    <View
      style={{
        height: 1000,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 30,
      }}>
      <View style={styles.searchContainer}>
        <AntDesign
          name="search1"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search products..."
          value={searchedText}
          onChangeText={setSearchedText}
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 10}}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            title={category}
            color={selectedCategory === category ? 'blue' : 'grey'}
            onPress={() =>
              setSelectedCategory(prev => (prev === category ? null : category))
            }>
            <View
              style={{
                margin: 10,
                height: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: selectedCategory === category ? 'blue' : 'grey',
                backgroundColor:
                  selectedCategory === category ? '#cce5ff' : '#fff',
                paddingHorizontal: 12,
                paddingVertical: 3,
              }}>
              <Text style={{fontFamily: 'TenorSans-Regular'}}>{category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item.id.toString() + index}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={{uri: item.thumbnail}} style={styles.image} />
            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                marginStart: 10,
              }}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                  ${item.price}
                </Text>
                <View
                  style={{
                    width: 80,
                    height: 30,
                    borderRadius: 15,
                    flexDirection: 'row',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20,
                  }}>
                  <AntDesign name="star" size={20} />
                  <Text style={{fontSize: 15, marginLeft: 8}}>
                    {item.rating}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 3,
                  opacity: 0.5,
                  fontFamily: 'TenorSans-Regular',
                }}>
                {item.warrantyInformation}
              </Text>
              <View
                style={{
                  height: 40,
                  width: 150,
                  borderWidth: 1,
                  borderRadius: 30,
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'blue',
                  backgroundColor: '#cce5ff',
                }}>
                <Text style={{fontSize: 13, fontFamily: 'TenorSans-Regular'}}>
                  Add to cart
                </Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{paddingBottom: 100}}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 2,
  },
  title: {
    fontFamily: 'TenorSans-Regular',
    fontWeight: 500,
    width: 180,
    fontSize: 17,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginTop: 8,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  searchView: {
    margin: 10,
    height: 50,
    width: '95%',
    paddingStart: 20,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'TenorSans-Regular',
    color: '#333',
  },
});
