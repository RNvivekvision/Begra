import { useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

const usePermissions = () => {
  const [State, setState] = useState({
    camera: null,
    microphone: null,
    gallery: null,
  });

  const checkPermissions = async () => {
    const camera = await checkPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
    const gallery = await checkPermission(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    console.log('check permission -> ', { camera, gallery });
    setState(p => ({
      ...p,
      camera: camera,
      gallery: gallery,
    }));
  };

  const requestPermissions = async () => {
    const camera = await requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    const gallery = await requestPermission(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    console.log('request permission -> ', { camera, gallery });
    setState(p => ({
      ...p,
      camera: camera,
      gallery: gallery,
    }));
  };

  return { permissions: { ...State }, requestPermissions, checkPermissions };
};

const checkPermission = async permission => {
  if (Platform.OS === 'android') {
    try {
      const result = await PermissionsAndroid.check(permission);
      return result;
    } catch (e) {
      console.error('Error checkPermission -> ', e);
      return false;
    }
  }
  // return false;
};

const requestPermission = async permission => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(permission);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      console.error('Error requestPermission -> ', e);
      return false;
    }
  }
  // return false;
};

export default usePermissions;

// import { useEffect, useState } from 'react';
// // import {
// //   checkMultiple,
// //   requestMultiple,
// //   PERMISSIONS,
// //   RESULTS,
// // } from 'react-native-permissions';
// import { isIOS } from '../Theme';

// const usePermissions = () => {
//   const [permissions, setPermissions] = useState({
//     camera: false,
//     microphone: false,
//     // gallery: false,
//   });

//   useEffect(() => {
//     checkPermissions();
//   }, []);

//   const checkPermissions = async () => {
//     if (isIOS) {
//       const result = await checkMultiple([
//         PERMISSIONS.IOS.CAMERA,
//         PERMISSIONS.IOS.MICROPHONE,
//         // PERMISSIONS.IOS.PHOTO_LIBRARY,
//       ]);
//       setPermissions({
//         camera: result[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
//         microphone: result[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED,
//         // gallery: result[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED,
//       });
//       return;
//     }

//     const result = await checkMultiple([
//       PERMISSIONS.ANDROID.CAMERA,
//       PERMISSIONS.ANDROID.RECORD_AUDIO,
//       PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//     ]);
//     setPermissions({
//       camera: result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
//       microphone: result[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED,
//       // gallery: result[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED,
//     });
//   };

//   const requestPermissions = async () => {
//     if (isIOS) {
//       const result = await requestMultiple([
//         PERMISSIONS.IOS.CAMERA,
//         PERMISSIONS.IOS.MICROPHONE,
//         // PERMISSIONS.IOS.PHOTO_LIBRARY,
//       ]);
//       setPermissions({
//         camera: result[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED,
//         microphone: result[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED,
//         // gallery: result[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED,
//       });
//       return;
//     }

//     const result = await requestMultiple([
//       PERMISSIONS.ANDROID.CAMERA,
//       PERMISSIONS.ANDROID.RECORD_AUDIO,
//       PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//     ]);
//     setPermissions({
//       camera: result[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED,
//       microphone: result[PERMISSIONS.ANDROID.RECORD_AUDIO] === RESULTS.GRANTED,
//       // gallery: result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED,
//     });
//   };

//   return { permissions, requestPermissions, checkPermissions };
// };

// export default usePermissions;
