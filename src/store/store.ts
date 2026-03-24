import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;