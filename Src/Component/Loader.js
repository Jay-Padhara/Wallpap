import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';

export const Loader = ({visible}) => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.main}>
          <ActivityIndicator size="large" color="red" />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
