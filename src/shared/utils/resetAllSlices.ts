import {actions} from '@/shared/redux/slices/users';
import {AppDispatch} from '@/shared/redux/store';

export const resetAllSlices = () => (dispatch: AppDispatch) => {
  dispatch(actions.resetUserState());

  // Other slices
};
