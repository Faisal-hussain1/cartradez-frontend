import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, UsersState} from '@/shared/types/redux';

const defaultState: UsersState = {
  currentUser: null,
  list: [],
};

const slice = createSlice({
  name: 'users',
  initialState: defaultState,
  reducers: {
    resetUserState: () => defaultState,
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCurrentUser = (state: {users: UsersState}) =>
  state.users.currentUser;

export const getUsersList = (state: {users: UsersState}) => state.users.list;

export const getUserRole = (state: {users: UsersState}) =>
  state.users.currentUser?.currentActiveOrganization?.role;
