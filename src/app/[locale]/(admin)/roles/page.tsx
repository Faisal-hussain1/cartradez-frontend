import ManageRolesHeader from '@/shared/components/common/admin/adminRole/ManageRolesHeader';
import RolesTable from '@/shared/components/common/admin/adminRole/RolesTable';

export default function RolesPage() {
  return (
    <div className='space-y-4'>
      <ManageRolesHeader />
      <RolesTable />
    </div>
  );
}
