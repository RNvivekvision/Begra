import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { RNButton, RNHeader, RNLoader, RNStyles, RNText } from '../Common';
import { NoCameraPermission } from '../Components';
import { Images, Strings } from '../Constants';
import { NavRoutes } from '../Navigation';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { Functions } from '../Utils';
import RNQRGenerator from 'rn-qr-generator';

const ScanBarcode = ({ navigation }) => {
  const [State, setState] = useState({
    code: null,
    isLoading: false,
    isButtonLoading: false,
    isFlashOn: false,
  });
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const styles = useStyles();
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
    return () => setState(p => ({ ...p, code: null }));
  }, []);

  const codeScanner = {
    codeTypes: [
      'qr',
      'code-128',
      'code-39',
      'code-93',
      'ean-13',
      'ean-8',
      'codabar',
      'itf',
      'pdf-417',
      'upc-e',
    ],
    onCodeScanned: codes => {
      const code = codes[0]?.value;
      if (!State.isButtonLoading) {
        console.log('code -> ', code);
        setState(p => ({ ...p, code: code }));
      }
    },
  };

  const onGalleryPress = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const photo = await Functions.openGallery();
      const qr = await RNQRGenerator.detect({
        uri: photo.path,
      });
      console.log(photo.path);
      console.log(qr);
      if (qr.values?.length === 0) alert('Barcode not found.');
      if (qr.values?.length > 0) {
        navigation.replace(NavRoutes.PhotoUpload, { code: qr.values[0] });
      }
    } catch (e) {
      console.log('Error onGalleryPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onPress = async () => {
    if (!State.code) return;
    setState(p => ({ ...p, isButtonLoading: true }));
    setTimeout(() => {
      navigation.replace(NavRoutes.PhotoUpload, { code: State.code });
    }, 1000);
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.ScanBarCode} />
      <RNLoader visible={State.isLoading} />
      {hasPermission ? (
        <View style={RNStyles.container}>
          {!State.isLoading && (
            <Camera
              style={styles.camera}
              device={device}
              isActive={isFocused}
              codeScanner={codeScanner}
              torch={State.isFlashOn ? 'on' : 'off'}
            />
          )}
          <View style={styles.overlay}>
            <RNText style={styles.title}>{Strings.ScanBarCode}</RNText>
            <RNText style={styles.description}>
              {Strings.ScanBarCodeDescription}
            </RNText>

            <View style={RNStyles.flexCenter}>
              <Image source={Images.ScannerFrame} style={styles.frame} />
            </View>

            <View style={styles.flashContainer}>
              <TouchableOpacity
                style={styles.flashButton}
                activeOpacity={0.6}
                onPress={onGalleryPress}>
                <Image
                  source={Images.Gallery}
                  resizeMode={'contain'}
                  style={styles.flashIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.flashButton}
                activeOpacity={0.6}
                onPress={() =>
                  setState(p => ({ ...p, isFlashOn: !p.isFlashOn }))
                }>
                <Image
                  source={Images.Flash}
                  resizeMode={'contain'}
                  style={styles.flashIcon}
                />
              </TouchableOpacity>
            </View>

            <RNButton
              disable={State.isButtonLoading}
              isLoading={State.isButtonLoading}
              title={Strings.ScanTheCode}
              style={styles.button}
              onPress={onPress}
            />
          </View>
        </View>
      ) : (
        <NoCameraPermission />
      )}
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: FontSize.font18,
      fontFamily: FontFamily.SemiBold,
      paddingTop: hp(4),
      color: Colors.White,
    },
    description: {
      width: '80%',
      alignSelf: 'center',
      fontSize: FontSize.font12,
      color: Colors.N475569,
      textAlign: 'center',
      paddingBottom: hp(4),
    },
    frame: {
      width: wp(80),
      height: wp(80),
      alignSelf: 'center',
      resizeMode: 'stretch',
    },
    camera: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    overlay: {
      flex: 1,
    },
    floatingButton: {
      alignSelf: 'center',
      right: null,
    },
    flashContainer: {
      ...RNStyles.flexRowBetween,
      width: '30%',
      alignSelf: 'center',
      marginVertical: hp(6),
    },
    flashButton: {
      ...RNStyles.center,
      paddingHorizontal: wp(2),
      paddingVertical: hp(1),
      borderRadius: 100,
      backgroundColor: Colors.EEF7FF,
    },
    flashIcon: {
      width: wp(6),
      height: wp(6),
    },
    button: {
      bottom: inset.bottom + hp(2),
      marginHorizontal: wp(8),
    },
  });
};

export default ScanBarcode;
