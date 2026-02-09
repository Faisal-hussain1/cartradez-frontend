import ManageListingsHeader from '@/shared/components/common/admin/adminListing/ManageListingsHeader';
import ManageListingsTable from '@/shared/components/common/admin/adminListing/ManageListingsTable';

const ListingPage = () => {
  return (
    <div>
      <ManageListingsHeader />
      <ManageListingsTable />
    </div>
  );
};

export default ListingPage;

// 'use client';

// import {ChevronDown, Calendar} from 'lucide-react';

// export default function ManageListingsHeader() {
//   return (
//     <section className='space-y-4'>
//       {/* Top row */}
//       <div className='flex items-center justify-between'>
//         <h1 className='text-2xl font-semibold text-[var(--blue100)]'>
//           Manage Listings
//         </h1>

//         <button
//           className='
//             px-4 py-2
//             text-sm font-medium
//             rounded-md
//             text-[var(--white)]
//             bg-[var(--sidebar-dark-blue)]
//             hover:opacity-90
//             transition
//           '
//         >
//           Create a New Listing
//         </button>
//       </div>

//       {/* Filters */}
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//         <FilterSelect label='Listed By' placeholder='All' />
//         <FilterSelect label='Listing Type' placeholder='All' />
//         <FilterDate />
//       </div>
//     </section>
//   );
// }

// /* ----------------------- */

// function FilterSelect({
//   label,
//   placeholder,
// }: {
//   label: string;
//   placeholder: string;
// }) {
//   return (
//     <div className='space-y-1.5'>
//       <label className='text-xs font-medium text-[var(--muted-foreground)]'>
//         {label}
//       </label>

//       <div
//         className='
//           flex items-center justify-between
//           px-3 py-2
//           bg-[var(--card)]
//           border border-[var(--border)]
//           rounded-md
//           cursor-pointer
//           hover:border-[var(--blue100)]
//           transition
//         '
//       >
//         <span className='text-sm text-[var(--foreground)]'>{placeholder}</span>
//         <ChevronDown size={16} className='text-[var(--muted-foreground)]' />
//       </div>
//     </div>
//   );
// }

// /* ----------------------- */

// function FilterDate() {
//   return (
//     <div className='space-y-1.5'>
//       <label className='text-xs font-medium text-[var(--muted-foreground)]'>
//         Created On
//       </label>

//       <div
//         className='
//           flex items-center justify-between
//           px-3 py-2
//           bg-[var(--card)]
//           border border-[var(--border)]
//           rounded-md
//           hover:border-[var(--blue100)]
//           transition
//         '
//       >
//         <span className='text-sm text-[var(--muted-foreground)]'>
//           Select Date or Date Range
//         </span>
//         <Calendar size={16} className='text-[var(--muted-foreground)]' />
//       </div>
//     </div>
//   );
// }
