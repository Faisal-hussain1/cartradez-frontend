'use client';

import {useState} from 'react';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

interface DealerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  status: string;
}

export default function DealerRequestsPage() {
  const router = useLocaleRouter();

  const [requests] = useState<DealerRequest[]>([
    {
      id: '1',
      name: 'Ali Traders',
      email: 'ali@gmail.com',
      phone: '03001234567',
      company: 'Ali Motors',
      city: 'Lahore',
      status: 'Pending',
    },
    {
      id: '2',
      name: 'Hassan Autos',
      email: 'hassan@gmail.com',
      phone: '03111234567',
      company: 'Hassan Cars',
      city: 'Karachi',
      status: 'Pending',
    },
  ]);

  const handleView = (id: string) => {
    router.push(`dashboard/admin/dealer-requests/${id}`);
  };

  return (
    <div className='p-10 bg-background min-h-screen'>
      {/* Page Title */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary'>Dealer Requests</h1>
        <p className='text-muted-foreground mt-2'>
          All new dealer registration requests are listed below.
        </p>
      </div>

      {/* Card Container */}
      <div className='bg-card rounded-xl shadow-glow border border-border overflow-hidden'>
        <table className='w-full text-left'>
          <thead className='bg-muted text-muted-foreground'>
            <tr>
              <th className='p-4'>Dealer Name</th>
              <th className='p-4'>Company</th>
              <th className='p-4'>Email</th>
              <th className='p-4'>City</th>
              <th className='p-4'>Status</th>
              <th className='p-4 text-center'>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((dealer) => (
              <tr
                key={dealer.id}
                className='border-b border-border hover:bg-mist transition'
              >
                <td className='p-4 font-medium text-foreground'>
                  {dealer.name}
                </td>

                <td className='p-4 text-muted-foreground'>{dealer.company}</td>

                <td className='p-4 text-muted-foreground'>{dealer.email}</td>

                <td className='p-4 text-muted-foreground'>{dealer.city}</td>

                <td className='p-4'>
                  <span className='px-3 py-1 text-sm rounded-full bg-mist text-primary font-medium'>
                    {dealer.status}
                  </span>
                </td>

                <td className='p-4 text-center'>
                  <button
                    onClick={() => handleView(dealer.id)}
                    className='bg-primary hover:bg-primary2 text-primary-foreground px-5 py-2 rounded-lg transition duration-200'
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className='p-8 text-center text-muted-foreground'>
            No dealer requests found.
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import {useParams} from 'next/navigation';
// import {useMemo} from 'react';

// interface DealerRequest {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
//   city: string;
//   showroomName: string;
//   showroomAddress: string;
//   experience: number;
//   nrcNo: string;
//   ntnNo: string;
//   carTypes: string;
//   socialMedia?: string;
// }

// export default function DealerRequestDetail() {
//   const params = useParams();
//   const id = params.id as string;

//   // 🔥 Temporary static data (later replace with API)
//   const dealers: DealerRequest[] = [
//     {
//       id: '1',
//       name: 'Ali Traders',
//       email: 'ali@gmail.com',
//       phone: '03001234567',
//       company: 'Ali Motors',
//       city: 'Lahore',
//       showroomName: 'Ali Motors Showroom',
//       showroomAddress: 'Main Boulevard Lahore',
//       experience: 5,
//       nrcNo: '123456/12/1',
//       ntnNo: '3456789',
//       carTypes: 'Used',
//       socialMedia: 'facebook.com/alimotors',
//     },
//   ];

//   const dealer = useMemo(() => dealers.find((d) => d.id === id), [id]);

//   if (!dealer) {
//     return (
//       <div className='p-10 text-center text-muted-foreground'>
//         Dealer not found.
//       </div>
//     );
//   }

//   return (
//     <div className='p-10 bg-background min-h-screen'>
//       <h1 className='text-3xl font-bold text-primary mb-8'>
//         Dealer Request Detail
//       </h1>

//       <div className='bg-card border border-border rounded-xl p-8 shadow-glow'>
//         <div className='grid grid-cols-12 gap-6'>
//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Dealer Name</p>
//             <p className='font-semibold text-foreground'>{dealer.name}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Email</p>
//             <p className='font-semibold'>{dealer.email}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Phone</p>
//             <p className='font-semibold'>{dealer.phone}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>City</p>
//             <p className='font-semibold'>{dealer.city}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Company</p>
//             <p className='font-semibold'>{dealer.company}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Showroom Name</p>
//             <p className='font-semibold'>{dealer.showroomName}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Experience</p>
//             <p className='font-semibold'>{dealer.experience} Years</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>Car Types</p>
//             <p className='font-semibold'>{dealer.carTypes}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>NRC No</p>
//             <p className='font-semibold'>{dealer.nrcNo}</p>
//           </div>

//           <div className='col-span-12 md:col-span-6'>
//             <p className='text-muted-foreground'>NTN No</p>
//             <p className='font-semibold'>{dealer.ntnNo}</p>
//           </div>

//           <div className='col-span-12'>
//             <p className='text-muted-foreground'>Showroom Address</p>
//             <p className='font-semibold'>{dealer.showroomAddress}</p>
//           </div>

//           {dealer.socialMedia && (
//             <div className='col-span-12'>
//               <p className='text-muted-foreground'>Social Media</p>
//               <p className='font-semibold text-primary'>{dealer.socialMedia}</p>
//             </div>
//           )}
//         </div>

//         {/* Approve / Reject Buttons */}
//         <div className='flex justify-end mt-8 gap-4'>
//           <button className='bg-green100 text-white px-6 py-2 rounded-lg'>
//             Approve
//           </button>
//           <button className='bg-destructive text-destructive-foreground px-6 py-2 rounded-lg'>
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
