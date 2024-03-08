import React, { forwardRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontSize, hp, wp } from '../Theme';
import RNInput from './RNInput';
import RNStyles from './RNStyles';
import RNText from './RNText';

const SCInput = forwardRef(
  ({ title, icon, onIconPress, error, ...rest }, ref) => {
    const styles = useStyles({ error });

    return (
      <View style={styles.container}>
        {title && <RNText style={styles.title}>{title}</RNText>}
        <View style={styles.inputContainer}>
          <RNInput
            ref={ref}
            placeholderTextColor={error ? Colors.d13232 : Colors.Placeholder}
            style={styles.input}
            {...rest}
          />

          {icon && (
            <TouchableOpacity
              style={styles.IconContainer}
              activeOpacity={0.6}
              onPress={onIconPress}>
              <Image source={icon} resizeMode={'contain'} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

const useStyles = ({ error }) => {
  return StyleSheet.create({
    container: {
      paddingTop: hp(2),
    },
    title: {
      fontSize: FontSize.font12,
      color: error ? Colors.d13232 : Colors.N475569,
    },
    inputContainer: {
      ...RNStyles.flexRow,
      borderBottomWidth: 1,
      borderBottomColor: error ? Colors.d13232 : Colors.D7EBFF,
    },
    input: {
      fontSize: FontSize.font14,
      flex: 1,
      marginVertical: 0,
      paddingHorizontal: 0,
      color: error ? Colors.d13232 : Colors.N054579,
    },
    IconContainer: {
      ...RNStyles.center,
      width: wp(8),
      height: wp(8),
      marginLeft: wp(1),
    },
    icon: {
      ...RNStyles.image70,
      tintColor: error ? Colors.d13232 : Colors.Black,
    },
  });
};

export default SCInput;
