import ManageListingsHeader from '@/shared/components/common/admin/adminListing/ManageListingsHeader';
import ManageListingsTable from '@/shared/components/common/admin/adminListing/ManageListingsTable';

const ListingPage = () => {
  return (
    <div className='w-full space-y-4'>
      <ManageListingsHeader />
      <ManageListingsTable />
    </div>
  );
};

export default ListingPage;
