import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  RNButton,
  RNInput,
  RNKeyboardAvoid,
  RNStyles,
  RNText,
} from '../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { RNHeader } from '../Common';
import { NavRoutes } from '../Navigation';
import { Images, Strings } from '../Constants';
import { usePermissions } from '../Hooks';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { deleteAllPhotos } from '../Redux/Actions';

const BarcodeInput = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { requestPermissions } = usePermissions();
  const [State, setState] = useState({
    barcode: '',
    submitPressed: false,
    isLoading: false,
  });

  const ResetState = () => {
    dispatch(deleteAllPhotos());
    setState(p => ({
      barcode: '',
      submitPressed: false,
      isLoading: false,
    }));
  };

  useEffect(() => {
    if (isFocused) {
      ResetState();
    }
  }, [isFocused]);

  const errorBarcode =
    State.submitPressed &&
    (State.barcode.length === 0 || State.barcode.length < 4);
  const noErrors = State.barcode.length > 3;
  const styles = useStyles({ error: errorBarcode });

  const onSubmitPress = async () => {
    try {
      setState(p => ({ ...p, submitPressed: true }));
      if (noErrors) {
        await requestPermissions();
        navigation.navigate(NavRoutes.PhotoUpload, {
          code: State.barcode.trimEnd(),
        });
      }
    } catch (e) {
      console.log('Error onSubmitPress -> ', e);
    }
  };

  const onScanBarcodePress = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      await requestPermissions();
      navigation.navigate(NavRoutes.ScanBarcode);
    } catch (e) {
      console.log('Error onScanBarcodePress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.BarcodeScanner} LeftIcon={null} />
      <RNKeyboardAvoid>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <RNText
            align={'center'}
            pTop={hp(2)}
            pBottom={hp(1)}
            size={FontSize.font18}
            family={FontFamily.SemiBold}>
            {Strings.BarcodeScanner}
          </RNText>

          <RNText
            align={'center'}
            size={FontSize.font12}
            color={Colors.N475569}
            style={{ width: '70%', alignSelf: 'center' }}>
            {Strings.BarcodeScannerDescription}
          </RNText>

          <Image
            source={Images.barcodeLogo}
            resizeMode={'contain'}
            style={styles.barcodeLogo}
          />

          <RNText pLeft={wp(4)} family={FontFamily.Medium}>
            {Strings.EnterBarcodeCode}
          </RNText>
          <RNInput
            placeholder={Strings.EnterBarcodeCodeHere}
            placeholderTextColor={errorBarcode ? Colors.d13232 : Colors.Black}
            style={styles.input}
            value={State.barcode}
            onChangeText={v =>
              setState(p => ({ ...p, barcode: v.trimStart() }))
            }
          />

          <RNButton
            title={Strings.SubmitCode}
            style={styles.button}
            onPress={onSubmitPress}
          />
          <RNText style={styles.OR}>{Strings.Or}</RNText>
          <RNButton
            disable={State.isLoading}
            isLoading={State.isLoading}
            title={Strings.ScanBarCode}
            style={styles.button}
            onPress={onScanBarcodePress}
          />
        </ScrollView>
      </RNKeyboardAvoid>
    </View>
  );
};

const useStyles = ({ error = true }) => {
  return StyleSheet.create({
    barcodeLogo: {
      width: '80%',
      height: hp(30),
      marginVertical: hp(4),
      alignSelf: 'center',
    },
    OR: {
      alignSelf: 'center',
      paddingVertical: hp(1.5),
      fontSize: FontSize.font12,
    },
    input: {
      backgroundColor: Colors.EEF7FF,
      marginHorizontal: wp(4),
      borderRadius: wp(2),
      fontSize: FontSize.font12,
      fontFamily: error ? FontFamily.Medium : FontFamily.ExtraLight,
      color: error ? Colors.d13232 : Colors.Black,
    },
    button: {
      marginHorizontal: wp(6),
    },
  });
};

export default BarcodeInput;
