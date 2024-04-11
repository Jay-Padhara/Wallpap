import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import {Loader} from '../Component/Loader';
import {Bottommodal} from '../Component/Bottommodal';
import {fonts} from '../assets/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Wallpap({route}) {
  const navigation = useNavigation();
  const image = route?.params?.data;

  const [isloading, setLoading] = useState(false);
  const [isbottommodal, setBottommodal] = useState(false);

  const callback = res => {
    setLoading(true);
    console.log('Response: ', res);
    setLoading(false);
    setBottommodal(false);
  };

  const setHome = () => {
    try {
      setLoading(true);
      ManageWallpaper.setWallpaper(
        {
          uri: image,
        },
        callback,
        TYPE.HOME,
      );
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const setLock = () => {
    try {
      setLoading(true);
      ManageWallpaper.setWallpaper(
        {
          uri: image,
        },
        callback,
        TYPE.LOCK,
      );
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const setBoth = () => {
    try {
      setLoading(true);
      ManageWallpaper.setWallpaper(
        {
          uri: image,
        },
        callback,
        TYPE.BOTH,
      );
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />

      <ImageBackground style={styles.imageBackground} source={{uri: image}}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.img} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setBottommodal(true)}>
          <Text style={styles.text}>Set as wallpaper</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Bottommodal
        visible={isbottommodal}
        onPress={() => setBottommodal(false)}
        onHome={() => {
          setHome();
        }}
        onLock={() => {
          setLock();
        }}
        onBoth={() => {
          setBoth();
        }}
        onClose={() => setBottommodal(false)}
      />

      <Loader visible={isloading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    position: 'absolute',
    bottom: hp('5%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: hp('3%'),
    backgroundColor: '#3498db',
    elevation: 5,
  },

  text: {
    color: 'white',
    fontSize: wp('5%'),
    fontFamily: fonts.medium,
  },

  back: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
    padding: wp('2.5%'),
    borderRadius: wp('3%'),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  img: {
    width: wp('7%'),
    height: wp('6%'),
  },
});
