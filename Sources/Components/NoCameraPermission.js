import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { RNText, RNStyles, RNButton } from '../Common';
import { Colors, FontFamily, FontSize, hp } from '../Theme';
import { Strings } from '../Constants';

const NoCameraPermission = () => {
  return (
    <View style={styles.container}>
      <RNText style={styles.text}>{Strings.NoCameraPermission}</RNText>

      <RNButton
        title={Strings.RequestPermission}
        style={styles.button}
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
    backgroundColor: Colors.Black,
  },
  text: {
    paddingHorizontal: 20,
    fontSize: FontSize.font24,
    fontFamily: FontFamily.SemiBold,
    textAlign: 'center',
    color: Colors.White,
  },
  button: {
    width: '70%',
    marginTop: hp(5),
  },
});

export default NoCameraPermission;
