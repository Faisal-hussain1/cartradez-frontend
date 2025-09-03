import {CustomerData, PaymentDetailsState} from '@/shared/types/redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const defaultState: PaymentDetailsState = {
  paymentDetails: null,
};

const slice = createSlice({
  name: 'payments',
  initialState: defaultState,
  reducers: {
    resetPaymentState: () => defaultState,
    setPaymentDetails(state, action: PayloadAction<string>) {
      state.paymentDetails = {
        ...state.paymentDetails,
        paymentIntentId: action.payload,
        customerName: state.paymentDetails?.customerName || '',
        customerEmail: state.paymentDetails?.customerEmail || '',
        customerPhoneNo: state.paymentDetails?.customerPhoneNo || '',
      };
    },
    setPaymentCustomerData(state, action: PayloadAction<CustomerData>) {
      state.paymentDetails = {
        ...state.paymentDetails,
        customerName: action.payload.customerName,
        customerEmail: action.payload.customerEmail,
        customerPhoneNo: action.payload.customerPhoneNo,
      };
    },
    resetPaymentDetails(state) {
      state.paymentDetails = null;
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getPaymentIntentDetails = (state: {
  payments: PaymentDetailsState;
}) => state.payments.paymentDetails;
