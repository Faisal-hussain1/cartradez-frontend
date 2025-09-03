import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CheckbookBackdropState = {
  show: boolean;
};

const initialState: CheckbookBackdropState = {
  show: false,
};

const checkbookBackdropSlice = createSlice({
  name: 'checkbookBackdrop',
  initialState,
  reducers: {
    updateCheckbookBackDropStatus(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
  },
});

export default checkbookBackdropSlice.reducer;

export const actions = checkbookBackdropSlice.actions;

// Selector
export const getCheckbookBackDropStatus = (state: {
  checkbookBackdrop: CheckbookBackdropState;
}) => state.checkbookBackdrop.show;
