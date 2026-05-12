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
      const user: any = action.payload;

      if (!user) {
        state.currentUser = null;
        return;
      }

      const normalizedRole =
        user?.systemRole || user?.currentActiveOrganization?.role || 'user';

      state.currentUser = {
        ...user,
        systemRole: normalizedRole,
      };
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

export const getCurrentUser = (state: {users: UsersState}) =>
  state.users.currentUser;

export const getUsersList = (state: {users: UsersState}) => state.users.list;

export const getUserRole = (state: {users: UsersState}) =>
  (state.users.currentUser as any)?.systemRole ||
  (state.users.currentUser as any)?.currentActiveOrganization?.role;
