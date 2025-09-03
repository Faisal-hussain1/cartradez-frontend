import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type defaultBusinessState = {
  businessId: string | null;
};

const initialState: defaultBusinessState = {
  businessId: null,
};

const defaultBusinessSlice = createSlice({
  name: 'defaultBusiness',
  initialState,
  reducers: {
    setBusinessId: (state, action: PayloadAction<string | null>) => {
      state.businessId = action.payload;
    },
    resetBusinessSelectState: () => {
      return initialState;
    },
  },
});

export default defaultBusinessSlice.reducer;

export const actions = defaultBusinessSlice.actions;

// Selector
export const getDefaultBusinessId = (state: any) =>
  state.defaultBusiness.businessId;
