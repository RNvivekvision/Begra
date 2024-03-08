import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

const openGallery = async () => {
  const photo = await ImageCropPicker.openPicker({
    width: 800,
    height: 800,
    cropping: true,
    mediaType: 'photo',
    freeStyleCropEnabled: true,
  });
  return photo;
};

const resizeImage = async ({
  uri,
  maxWidth = 1024,
  maxHeight = 1024,
  targetSizeKB = 500,
}) => {
  let quality = 80;
  let resizedImage = await ImageResizer.createResizedImage(
    uri,
    maxWidth,
    maxHeight,
    'JPEG',
    quality,
  );
  console.log('Actual file size: ', resizedImage.size / 1024, 'KB');
  while (resizedImage.size > targetSizeKB * 1024 && quality > 0) {
    quality -= 5;
    resizedImage = await ImageResizer.createResizedImage(
      uri,
      maxWidth,
      maxHeight,
      'JPEG',
      quality,
    );
    console.log('Loop size: ', resizedImage.size / 1024, 'KB');
  }
  console.log('Actual file size: ', resizedImage.size / 1024, 'KB');
  return resizedImage;
};

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const Functions = {
  setAppData,
  getAppData,
  openGallery,
  resizeImage,
};

export default Functions;
