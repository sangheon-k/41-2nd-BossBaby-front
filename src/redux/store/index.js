import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import commonReducer from '../slices/commonSlice';
import counterReducer from '../slices/counterSlice';
import paymentReducer from '../slices/paymentSlice';

const reducer = {
  common: commonReducer,
  counter: counterReducer,
  payment: paymentReducer,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
