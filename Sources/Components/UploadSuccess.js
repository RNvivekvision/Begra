import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { RNButton, RNModal, RNText } from '../Common';
import { Strings } from '../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UploadSuccess = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <RNModal visible={visible} onClose={onClose}>
      <View style={{ flex: 1 }} />
      <RNText style={styles.text}>{Strings.PhotoSuccessfullyUploaded}</RNText>
      <RNButton
        title={Strings.BackToHome}
        style={styles.button}
        onPress={() => {
          onClose?.();
          navigation.goBack();
        }}
      />
    </RNModal>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    text: {
      fontSize: FontSize.font30,
      fontFamily: FontFamily.Bold,
      paddingHorizontal: wp(8),
      textAlign: 'center',
      paddingVertical: hp(10),
      color: Colors.White,
    },
    button: {
      marginBottom: inset.bottom + hp(2),
      marginHorizontal: wp(6),
    },
  });
};

export default UploadSuccess;
