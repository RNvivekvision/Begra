import { configureStore } from '@reduxjs/toolkit';
import { UserReducer, UploadPhotoReducer } from './Reducers';

export const Store = configureStore({
  reducer: { UserReducer, UploadPhotoReducer },
});
