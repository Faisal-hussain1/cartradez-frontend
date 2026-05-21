import ManageListingsHeader from '@/shared/components/common/admin/adminListing/ManageListingsHeader';
import ManageListingsTable from '@/shared/components/common/admin/adminListing/ManageListingsTable';

const ManagedByCartradezPage = () => {
  return (
    <div className='w-full space-y-4'>
      <ManageListingsHeader title='Managed by Cartradez' />
      <ManageListingsTable managedOnly />
    </div>
  );
};

export default ManagedByCartradezPage;
