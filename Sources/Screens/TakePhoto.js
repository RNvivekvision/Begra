import React, { useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RNButton, RNHeader, RNStyles } from '../Common';
import { UploadSuccess } from '../Components';
import { addPhoto } from '../Redux/Actions';
import { Images, Strings } from '../Constants';
import { hp, wp } from '../Theme';
import { Functions } from '../Utils';
import { Toast } from 'react-native-toast-notifications';

const TakePhoto = ({ navigation }) => {
  const [State, setState] = useState({
    isLoading: false,
    showUploadSuccess: false,
  });
  const cameraRef = useRef();
  const dispatch = useDispatch();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const styles = useStyles();

  const onTakePhoto = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const image = await cameraRef.current.takePhoto({
        qualityPrioritization: 'balanced',
        flash: 'off',
        enableShutterSound: false,
      });
      const photo = await Functions.resizeImage({ uri: image.path });
      // photo.path = Platform.OS == 'android' ? `file://${photo.path}` : photo.path;

      console.log('onTakePhoto -> ', JSON.stringify(photo, null, 2));
      if (photo?.path) {
        setState(p => ({ ...p, showUploadSuccess: true }));
        dispatch(addPhoto(photo));
      }
    } catch (e) {
      console.log('Error onTakePhoto -> ', e);
      setState(p => ({ ...p, isLoading: false }));
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.TakePhoto} />

      <View style={styles.cameraContainer}>
        <Image
          source={Images.TakePhotoFrame}
          resizeMode={'stretch'}
          style={styles.frame}
        />
        {device && (
          <Camera
            ref={cameraRef}
            device={device}
            isActive={isFocused}
            style={RNStyles.container}
            photo={true}
            enableZoomGesture={true}
            onError={e => console.log(e)}
          />
        )}
      </View>

      <RNButton
        disable={State.isLoading}
        isLoading={State.isLoading}
        title={Strings.TakePhoto}
        style={styles.button}
        onPress={onTakePhoto}
      />

      <UploadSuccess
        visible={State.showUploadSuccess}
        onClose={() => setState(p => ({ ...p, showUploadSuccess: false }))}
      />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    frame: {
      ...StyleSheet.absoluteFillObject,
      ...RNStyles.image100,
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    cameraContainer: {
      flex: 1,
      height: '100%',
      width: '90%',
      alignSelf: 'center',
      marginTop: hp(2),
      borderRadius: wp(3),
      overflow: 'hidden',
    },
    button: {
      marginHorizontal: wp(6),
      marginVertical: hp(2),
    },
  });
};

export default TakePhoto;
