import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import actionSlice from './slices/actionSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    action:actionSlice.reducer
    
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;