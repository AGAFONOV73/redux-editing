import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ServicesState } from '../../types';

const initialState: ServicesState = {
  items: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<{ name: string; price: number }>) => {
      const newService = {
        id: Date.now().toString(),
        name: action.payload.name,
        price: action.payload.price,
      };
      state.items.push(newService);
    },
    updateService: (state, action: PayloadAction<{ id: string; name: string; price: number }>) => {
      const index = state.items.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        };
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(service => service.id !== action.payload);
    },
  },
});

export const { addService, updateService, deleteService } = servicesSlice.actions;
export default servicesSlice.reducer;