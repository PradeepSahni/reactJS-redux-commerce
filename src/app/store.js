import { configureStore } from '@reduxjs/toolkit';
import SliceReducer from '../features/store/Slice';

export const store = configureStore({
  reducer: {
    myStore : SliceReducer,
  },
});
