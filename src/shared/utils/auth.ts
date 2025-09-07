import {
  ADMIN_ROUTES,
  MANAGER_ROUTES,
  ROOT_ROUTE,
} from '@/shared/constants/PATHS';
import {ROLES} from '@/shared/constants/users';
import {RoleType} from '@/shared/types/auth';

export const getRoleFlags = ({role}: RoleType) => {
  const isAdmin = role === ROLES.admin.value;
  const isManager = role === ROLES.manager.value;
  const isDealer = role === ROLES.dealer.value;
  const isUser = role === ROLES.user.value;

  return {isAdmin, isManager, isDealer, isUser};
};

export const getRedirectUrl = ({role}: RoleType): string => {
  const {isAdmin, isManager, isDealer, isUser} = getRoleFlags({role});

  if (isAdmin) return ADMIN_ROUTES.temp.all;
  if (isManager) return MANAGER_ROUTES.login;
  if (isUser || isDealer) return ROOT_ROUTE;

  return ROOT_ROUTE;
};
