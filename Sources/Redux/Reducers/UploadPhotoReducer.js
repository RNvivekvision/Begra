import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Images: [],
};

const UploadPhotoReducer = createSlice({
  name: 'UploadPhotoReducer',
  initialState: initialState,
  reducers: {
    addPhoto: (s, a) => {
      s.Images = s.Images.concat(a.payload);
    },
    deleteAllPhotos: s => {
      s.Images = [];
    },
  },
});

export const { addPhoto, deleteAllPhotos } = UploadPhotoReducer.actions;

export default UploadPhotoReducer.reducer;
