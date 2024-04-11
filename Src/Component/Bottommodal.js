import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {fonts} from '../assets/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Bottommodal = ({visible, onHome, onLock, onBoth, onClose}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}>
        <TouchableWithoutFeedback style={styles.overlay} onPress={onClose}>
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={styles.headtext}>
                <Text style={styles.txt}>Select..!</Text>
              </View>

              <TouchableOpacity onPress={onHome} style={styles.touch}>
                <Text style={styles.setwall}>--{'>'} Set as home screen</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onLock} style={styles.touch}>
                <Text style={styles.setwall}>--{'>'} Set as lock screen</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onBoth} style={styles.touch}>
                <Text style={styles.setwall}>--{'>'} Set as both</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },

  head: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: hp('36%'),
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  headtext: {
    alignItems: 'center',
  },

  txt: {
    fontSize: wp('7%'),
    fontFamily: fonts.bold,
    marginTop: hp('2.5%'),
    color: 'black',
  },

  setwall: {
    fontSize: wp('6%'),
    fontFamily: fonts.regular,
    marginTop: 30,
    color: 'black',
  },

  touch: {
    marginLeft: wp('10%'),
  },
});
