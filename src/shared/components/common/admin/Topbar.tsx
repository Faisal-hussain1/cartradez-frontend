// 'use client';

import {Bell} from 'lucide-react';

// import {Bell, Search} from 'lucide-react';

// export default function Topbar() {
//   return (
//     <header
//       className='
//         fixed
//         top-0
//         left-[var(--sidebar-width)]
//         right-0
//         h-[var(--topbar-height)]
//         bg-[var(--card)]
//         border-b border-[var(--border)]
//         px-4 sm:px-6
//         z-30
//         flex items-center
//         rounded-b-lg
//       '
//     >
//       <div className='flex items-center justify-between w-full'>
//         {/* Search */}
//         <div className='hidden sm:block w-[300px] relative'>
//           <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
//           <input
//             placeholder='Search here...'
//             className='
//               w-full pl-10 pr-4 py-2 text-sm
//               bg-background
//               border border-border
//               rounded-lg
//             '
//           />
//         </div>

//         {/* Right */}
//         <div className='flex items-center gap-4'>
//           <Bell className='w-5 h-5' />
//           <img src='/avatar.jpg' className='w-8 h-8 rounded-full border' />
//         </div>
//       </div>
//     </header>
//   );
// }
export default function Topbar() {
  return (
    <header className='sticky top-0 h-16 bg-white border-b z-20 flex items-center justify-between px-6 rounded-b-lg'>
      <input
        type='text'
        placeholder='Search here...'
        className='border rounded px-3 py-2 w-80'
      />
      <div className='flex items-center gap-4'>
        <Bell className='w-5 h-5' />
        <img src='/avatar.jpg' className='w-8 h-8 rounded-full border' />
      </div>
    </header>
  );
}
