import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {fonts} from '../assets/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API, CLIENT_ID} from '../Helper/Utils';

export default function Wall() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState();
  const [fetchedImageIds, setFetchedImageIds] = useState(new Set());

  const handleApi = async () => {
    try {
      if (!search) {
        const response = await axios.get(
          `${API}photos/?client_id=${CLIENT_ID}&page=${page}&per_page=${100}`,
        );

        const newData = response.data.filter(
          item => !fetchedImageIds.has(item.id),
        );
        setData(prevData => [...prevData, ...newData]);
        setFetchedImageIds(
          prevIds => new Set([...prevIds, ...newData.map(item => item.id)]),
        );
        setPage(page + 1);
      } else {
        const result = await axios.get(
          `${API}search/photos?client_id=${CLIENT_ID}&page=${page}&query=${search}`,
        );
        const newData = result.data.results.filter(
          item => !fetchedImageIds.has(item.id),
        );
        setSearchdata(predata => [...predata, ...newData]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Text style={styles.head}>Un_Splashes..!</Text>

      <View style={styles.search}>
        <TextInput
          placeholder="Search your image..."
          style={styles.textin}
          placeholderTextColor="grey"
          onChangeText={text => setSearch(text)}
          onSubmitEditing={handleApi}
        />
      </View>

      <View style={styles.image}>
        {!searchdata.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={handleApi} />
            }
            ListFooterComponent={
              <ActivityIndicator size="large" color="green" />
            }
            onEndReached={handleApi}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Wallpap', {data: item?.urls?.full})
                  }>
                  <Image style={styles.img} source={{uri: item?.urls?.full}} />
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={searchdata}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={handleApi} />
            }
            ListFooterComponent={
              <ActivityIndicator size="large" color="green" />
            }
            onEndReached={handleApi}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Wallpap', {data: item?.urls?.full})
                  }>
                  <Image style={styles.img} source={{uri: item?.urls?.full}} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  head: {
    fontSize: wp('8%'),
    color: 'black',
    margin: wp('2%'),
    fontFamily: fonts.bold,
  },

  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('12%'),
  },

  img: {
    width: wp('50%'),
    height: hp('50%'),
    resizeMode: 'cover',
  },

  search: {
    margin: wp('2%'),
  },

  textin: {
    padding: wp('3%'),
    color: 'black',
    fontFamily: fonts.medium,
    fontSize: wp('4%'),
    backgroundColor: 'lightgrey',
    borderRadius: wp('3%'),
  },
});
