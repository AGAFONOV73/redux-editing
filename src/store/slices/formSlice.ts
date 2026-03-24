import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormState, Service } from '../../types';

const initialState: FormState = {
  name: '',
  price: '',
  editingId: null,
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: 'name' | 'price'; value: string }>) => {
      state[action.payload.field] = action.payload.value;
      if (state.errors[action.payload.field]) {
        delete state.errors[action.payload.field];
      }
    },
    startEditing: (state, action: PayloadAction<Service>) => {
      state.name = action.payload.name;
      state.price = action.payload.price.toString();
      state.editingId = action.payload.id;
      state.errors = {};
    },
    cancelEditing: (state) => {
      state.name = '';
      state.price = '';
      state.editingId = null;
      state.errors = {};
    },
    clearForm: (state) => {
      state.name = '';
      state.price = '';
      state.editingId = null;
      state.errors = {};
    },
    setValidationError: (state, action: PayloadAction<{ field: string; error: string }>) => {
      state.errors[action.payload.field as keyof typeof state.errors] = action.payload.error;
    },
  },
});

export const { 
  setFormField, 
  startEditing, 
  cancelEditing, 
  clearForm, 
  setValidationError 
} = formSlice.actions;
export default formSlice.reducer;