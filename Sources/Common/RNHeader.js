import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { Images } from '../Constants';
import RNText from './RNText';
import RNStyles from './RNStyles';

const RNHeader = ({
  title,
  onLeftPress,
  LeftIcon = Images.Back,
  containerStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();
  const styles = useStyles();
  return (
    <View style={[styles.Container, containerStyle]}>
      {LeftIcon && (
        <TouchableOpacity
          onPress={() => (onLeftPress ? onLeftPress?.() : navigation.goBack())}
          style={styles.Left}>
          <Image source={LeftIcon} resizeMode={'contain'} style={styles.icon} />
        </TouchableOpacity>
      )}
      <RNText style={[styles.title, titleStyle]}>{title}</RNText>
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    Container: {
      ...RNStyles.flexRowBetween,
      backgroundColor: Colors.Primary,
      paddingVertical: hp(1.5),
      paddingHorizontal: wp(3),
      paddingTop: inset.top + hp(1.5),
      borderBottomWidth: 1,
      borderBottomColor: Colors.Placeholder,
    },
    Left: {
      ...RNStyles.center,
      width: wp(7),
      height: wp(7),
      marginHorizontal: hp(0.5),
    },
    title: {
      flex: 1,
      paddingHorizontal: hp(1),
      fontSize: FontSize.font15,
      fontFamily: FontFamily.Medium,
      color: Colors.White,
    },
    icon: {
      ...RNStyles.image90,
      tintColor: Colors.White,
    },
  });
};

export default RNHeader;
