'use client';

import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {getRedirectUrl} from '@/shared/utils/auth';

export default function DashboardContent() {
  const user = useSelector(getCurrentUser);
  const router = useLocaleRouter();

  useEffect(() => {
    const role = user?.currentActiveOrganization.role;

    const url = getRedirectUrl({role: role as string});
    router.push(url);
  }, [user, router]);

  return null;
}
