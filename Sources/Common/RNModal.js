import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, hp, wp } from '../Theme';
import RNStyles from './RNStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Images } from '../Constants';

const RNModal = ({
  visible,
  onClose,
  children,
  animationType,
  transparent,
  style,
  ...restProps
}) => {
  const styles = useStyles();
  return (
    <Modal
      animationType={animationType ?? 'slide'}
      transparent={transparent ?? true}
      visible={visible}
      onRequestClose={onClose}
      {...restProps}>
      <View style={[styles.blackOverlay, style]}>
        {/* <TouchableOpacity onPress={onClose} style={styles.imageContainer}>
          <Image
            source={Images.Cross}
            resizeMode={'contain'}
            style={styles.image}
          />
        </TouchableOpacity> */}
        {children}
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    blackOverlay: {
      ...RNStyles.container,
      backgroundColor: Colors.Black + '80',
    },
    imageContainer: {
      ...RNStyles.center,
      width: wp(6),
      height: wp(6),
      position: 'absolute',
      top: inset.top + hp(3),
      right: wp(5),
      zIndex: 1,
    },
    image: {
      ...RNStyles.image90,
      tintColor: Colors.White,
    },
  });
};

export default RNModal;
