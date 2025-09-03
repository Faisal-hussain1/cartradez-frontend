export const ROLES = {
  admin: {
    value: 'admin',
  },
  manager: {
    value: 'manager',
  },
  dealer: {
    value: 'dealer',
  },
  user: {
    value: 'user',
  },
};

export const ROLES_LABELS = (t: any) => ({
  [ROLES.admin.value]: {
    label: t('roles.admin'),
  },
  [ROLES.manager.value]: {
    label: t('roles.manager'),
  },
  [ROLES.dealer.value]: {
    label: t('roles.dealer'),
  },
  [ROLES.user.value]: {
    label: t('roles.user'),
  },
});
