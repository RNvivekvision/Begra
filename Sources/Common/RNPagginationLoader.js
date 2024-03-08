import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, hp, wp } from '../Theme';
const RNPagginationLoader = ({ size, color, style }) => {
  return (
    <View style={[styles.Box, style]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || Colors.Primary}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Box: {
    // backgroundColor: Colors.White,
    paddingVertical: wp(0.2),
  },
});
export default RNPagginationLoader;
