import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/shared/components/ui/sidebar';
import NavRoutes from './NavRoutes';
import {SignOutIcon} from '@/shared/components/icons';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {Separator} from '@/shared/components/ui/separator';
import Footer from '@/shared/components/layout/footer';
import {userMutations} from '@/shared/reactQuery';
import Logo from '@/shared/components/common/logo';
import UserInfo from './UserInfo';
import {LOGO_VARIATIONS} from '@/shared/constants/general';

const AppSidebar = () => {
  const {useSignOutMutation} = userMutations();

  const {mutate: executeSignOutMutation} = useSignOutMutation();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo
          width={186}
          height={102}
          sizeVariation='sidebar'
          variation={LOGO_VARIATIONS.white.value}
        />
      </SidebarHeader>

      {/* divider  */}
      <Separator className='mx-2 mt-5 mb-10 bg-white' />

      {/* routes  */}
      <SidebarContent>
        <UserInfo />
        <NavRoutes />
      </SidebarContent>

      {/* footer  */}
      <SidebarFooter>
        <PrimaryButton
          styles='bg-white/20 hover:bg-white/20 justify-start'
          buttonText={
            <>
              <SignOutIcon /> Logout
            </>
          }
          onClick={() => executeSignOutMutation({})}
        />
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
