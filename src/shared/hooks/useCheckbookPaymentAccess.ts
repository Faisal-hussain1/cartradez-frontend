import {useDispatch} from 'react-redux';
import {actions} from '@/shared/redux/slices/checkbookBackdrop';
import {AppDispatch} from '@/shared/redux/store';
import {useGetLoginUserData} from '@/shared/hooks/useGetLoginUserData';

export const useCheckbookPaymentAccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isCheckbookAccountDisabledAfterCreating} = useGetLoginUserData();

  const openCheckbookBackdrop = () => {
    dispatch(actions.updateCheckbookBackDropStatus(true));
  };

  const closeCheckBackdrop = () => {
    dispatch(actions.updateCheckbookBackDropStatus(false));
  };

  return {
    isCheckbookAccountDisabledAfterCreating,
    openCheckbookBackdrop,
    closeCheckBackdrop,
  };
};
