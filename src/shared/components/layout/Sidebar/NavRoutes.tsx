import {useSelector} from 'react-redux';
import useTranslation from '@/shared/hooks/useTranslation';
import {SIDEBAR_ROUTES_LIST} from '@/shared/constants/PATHS';
import {SidebarRoute} from '@/shared/interfaces/utils';
import {List, ListItem} from './Reusables';
import {getUserRole} from '@/shared/redux/slices/users';

const NavRoutes = () => {
  const {ct, t} = useTranslation();
  const sidebarRoutes = ct(SIDEBAR_ROUTES_LIST);
  const role = useSelector(getUserRole);

  let roleBaseRoutes = [];

  if (role) {
    roleBaseRoutes = sidebarRoutes
      .filter((item: SidebarRoute) => item.roles.includes(role))
      .map((route: SidebarRoute) => {
        // If the route has children, filter them based on roles as well
        if (route.children && route.children.length > 0) {
          const filteredChildren = route.children.filter((child: any) =>
            child.roles.includes(role)
          );

          // Return the route with filtered children
          return {
            ...route,
            children: filteredChildren,
          };
        }

        // Return the route as is if no children
        return route;
      });
  }

  return (
    <>
      <span className='text-white text-[10px]'>{t('dashboard.menu')}</span>
      <List>
        {roleBaseRoutes.length > 0 &&
          roleBaseRoutes.map((route: SidebarRoute) => (
            <ListItem route={route} key={route.value} />
          ))}
      </List>
    </>
  );
};

export default NavRoutes;
