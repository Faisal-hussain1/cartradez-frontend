import ManageUsers from '@/shared/components/common/admin/adminUsers/ManageUsers';
import ManagedByMeTable from '@/shared/components/common/admin/ManagedByMeTable';

const UsersPage = () => {
  return (
    <div>
      <ManageUsers />
      <ManagedByMeTable />
    </div>
  );
};

export default UsersPage;
