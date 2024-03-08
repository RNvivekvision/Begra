import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { RNStyles } from '../Common';
import { hp, wp } from '../Theme';

const size = wp(28.5);

const RenderImages = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item?.uri || item?.path }}
        resizeMode={'cover'}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    marginRight: wp(3),
    marginBottom: hp(1.5),
    borderRadius: wp(3),
  },
  image: {
    ...RNStyles.image100,
    borderRadius: wp(3),
  },
});

export default RenderImages;
