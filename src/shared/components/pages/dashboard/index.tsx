// 'use client';

// import {useEffect} from 'react';
// import {useSelector} from 'react-redux';
// import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
// import {getCurrentUser} from '@/shared/redux/slices/users';
// import {getRedirectUrl} from '@/shared/utils/auth';

// export default function DashboardContent() {
//   const user = useSelector(getCurrentUser);
//   const router = useLocaleRouter();

//   useEffect(() => {
//     const role = user?.currentActiveOrganization.role;

//     const url = getRedirectUrl({role: role as string});
//     router.push(url);
//   }, [user, router]);

//   return null;
// }

'use client';

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {getRedirectUrl} from '@/shared/utils/auth';

export default function DashboardContent() {
  const user = useSelector(getCurrentUser); // Getting the user from the store
  const router = useLocaleRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (!user) {
      console.log('No user data available. Redirecting to login.');
      router.replace('/auth/login'); // Redirect to login if no user

      return;
    }

    const role = user?.currentActiveOrganization?.role; // Get the role from user data

    if (!role) {
      console.log('No role found for user');
      setLoading(false);

      return;
    }

    // Get the appropriate redirect URL based on the role
    const url = getRedirectUrl({role});

    // Redirect to the correct page based on the role
    console.log('Redirecting to:', url);
    router.replace(url); // Use replace to ensure it's a single page navigation

    setLoading(false);
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while processing
  }

  return <div>Redirecting to your dashboard...</div>; // Display message while redirecting
}
