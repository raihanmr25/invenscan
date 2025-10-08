import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Also double-check that this path is correct!
// It goes up one level from 'components' to the root, then into 'assets'.
const logo = require('../assets/logodisnaker.png');

export default function LogoTitle() {
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
});