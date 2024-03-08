import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, hp, wp } from '../Theme';
import RNStyles from './RNStyles';

const size = wp(13);

const RNFloating = ({ icon, onPress, containerStyle, iconStyle }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {icon && (
        <Image
          source={icon}
          resizeMode={'contain'}
          style={[styles.icon, iconStyle]}
        />
      )}
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      ...RNStyles.center,
      ...RNStyles.shadow,
      width: size,
      height: size,
      position: 'absolute',
      bottom: inset.bottom + hp(12),
      right: wp(6),
      backgroundColor: Colors.Primary,
      borderRadius: 100,
    },
    icon: {
      ...RNStyles.image60,
    },
  });
};

export default RNFloating;
