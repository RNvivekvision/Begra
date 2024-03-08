import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from '../Theme';
import { NavRoutes } from '../Navigation';
import { RenderImages } from '../Components';
import { Strings, Images as PngImages } from '../Constants';
import { addPhoto } from '../Redux/Actions';
import { Functions } from '../Utils';
import {
  RNButton,
  RNFloating,
  RNHeader,
  RNInput,
  RNStyles,
  RNText,
} from '../Common';
import { Toast } from 'react-native-toast-notifications';
import { FetchMethod, URL } from '../Api';

const PhotoUpload = ({ navigation, route }) => {
  const [State, setState] = useState({ buttonLoading: false });
  const { User } = useSelector(({ UserReducer }) => UserReducer);
  const { Images } = useSelector(
    ({ UploadPhotoReducer }) => UploadPhotoReducer,
  );
  const dispatch = useDispatch();
  const code = route?.params?.code;
  const styles = useStyles();

  const openGallery = async () => {
    try {
      const image = await Functions.openGallery();
      const photo = await Functions.resizeImage({ uri: image.path });
      console.log(
        'addPhoto -> ',
        JSON.stringify({ ...image, ...photo }, null, 2),
      );
      dispatch(addPhoto({ ...image, ...photo }));
    } catch (e) {
      console.log('Error onUploadPress -> ', e);
    }
  };

  const onUploadPhotoPress = async () => {
    if (Images.length === 0) {
      Toast.show(Strings.Pleaseselectimage);
      return;
    }

    setState(p => ({ ...p, buttonLoading: true }));
    const formdata = new FormData();
    formdata.append('barcodeNumber', code);
    for (const image of Images) {
      formdata.append('images', {
        name: image.name,
        type: image.mime || 'image/jpeg',
        uri: isIOS ? image.uri.replace('file://', '') : image.uri,
      });
    }
    console.log('formdata -> ', JSON.stringify(formdata, null, 2));

    try {
      const response = await FetchMethod.POST_FORMDATA({
        EndPoint: URL.barcodeUpload,
        Params: formdata,
      });
      console.log('onUploadPhotoPress -> ', JSON.stringify(response, null, 2));
      if (response?.isSuccess) {
        Toast.show('Photos uploaded successfully.');
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else {
        Toast.show(response?.message);
      }
    } catch (e) {
      Toast.show('Something went wrong');
      console.log('Error onUploadPhotoPress -> ', e);
    } finally {
      setTimeout(() => {
        setState(p => ({ ...p, buttonLoading: false }));
      }, 1000);
    }
  };

  const ListHeaderComponent = ({}) => {
    return (
      <>
        <RNText
          align={'center'}
          size={FontSize.font18}
          family={FontFamily.SemiBold}>
          {Strings.UploadPhoto}
        </RNText>

        <RNText
          pVertical={hp(2)}
          align={'center'}
          size={FontSize.font12}
          color={Colors.N475569}
          style={{ width: '80%', alignSelf: 'center' }}>
          {Strings.UploadPhotoDescription}
        </RNText>

        <RNInput
          placeholder={Strings.EnterBarcodeCodeHere}
          style={styles.input}
          value={User?.email ?? Strings.Username}
          editable={false}
        />
        <RNInput
          placeholder={Strings.EnterBarcodeCodeHere}
          style={styles.input}
          value={code ?? Strings.BarcodeID}
          editable={false}
        />
        <RNText style={styles.heading}>{Strings.UploadPhoto}</RNText>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={openGallery}
          style={styles.uploadPhoto}>
          <Image
            source={PngImages.Upload}
            resizeMode={'contain'}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>
        {Images?.length > 0 && (
          <RNText style={styles.heading}>{Strings.PreviewUploadImages}</RNText>
        )}
      </>
    );
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.UploadPhoto} />

      <FlatList
        data={Images}
        keyExtractor={(v, i) => String(i)}
        numColumns={3}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={() => <ListHeaderComponent />}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => <RenderImages item={item} />}
      />

      <RNButton
        disable={State.buttonLoading}
        isLoading={State.buttonLoading}
        title={Strings.UploadPhoto}
        style={styles.uploadPhotoButton}
        onPress={onUploadPhotoPress}
      />

      <RNFloating
        icon={PngImages.Camera}
        onPress={() => navigation.navigate(NavRoutes.TakePhoto)}
      />
    </View>
  );
};

const useStyles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    contentContainerStyle: {
      paddingBottom: inset.bottom + hp(8),
      paddingTop: hp(2),
      paddingHorizontal: wp(4),
    },
    input: {
      backgroundColor: Colors.EEF7FF,
      borderRadius: wp(2),
      fontSize: FontSize.font12,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
    },
    heading: {
      fontSize: FontSize.font12,
      fontFamily: FontFamily.Medium,
      paddingVertical: hp(2),
    },
    uploadPhoto: {
      ...RNStyles.center,
      borderWidth: wp(0.3),
      borderColor: Colors.Black,
      borderStyle: 'dashed',
      borderRadius: wp(3),
      height: hp(10),
      backgroundColor: Colors.EEF7FF,
    },
    uploadIcon: {
      width: wp(7),
      height: wp(7),
    },
    uploadPhotoButton: {
      position: 'absolute',
      bottom: inset.bottom + hp(1),
      left: 0,
      right: 0,
      marginHorizontal: wp(6),
    },
  });
};

export default PhotoUpload;
