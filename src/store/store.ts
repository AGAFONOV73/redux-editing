import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import formReducer from './slices/formSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    form: formReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;