// 'use client';

// import Image from 'next/image';
// import axios from 'axios';
// import {useState} from 'react';

// export default function PaymentPage() {
//   const [listingType, setListingType] = useState('Premium');
//   const [listings, setListings] = useState(10);
//   const [loading, setLoading] = useState(false);

//   const listingOptions = [10, 20, 30, 40, 50];

//   const user = {
//     id: '12345',
//     email: 'test@email.com',
//     fullName: 'John Doe',
//     phone: '0971234567',
//   };

//   // 💰 pricing logic
//   const pricePerListing = 10;
//   const subtotal = listings * pricePerListing;
//   const serviceFee = 2.99;
//   const total = subtotal + serviceFee;

//   // ✅ Manual Payment Handler
//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-payment`,
//         {
//           amount: total,
//           plan: listingType,
//           listings,
//           userId: user.id,
//         }
//       );

//       alert('Payment Request Sent ✅');
//       console.log(res.data);
//     } catch (error) {
//       alert('Payment Failed ❌');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='min-h-screen bg-background'>
//       {/* HERO */}
//       <div className='relative w-full h-[240px] md:h-[300px] overflow-hidden'>
//         <Image
//           src='images/DisclaimerPic.jpg'
//           alt='payment'
//           fill
//           className='object-cover'
//         />
//         <div className='absolute inset-0 bg-primary/30' />
//       </div>

//       {/* CONTENT */}
//       <div className='max-w-6xl mx-auto px-4 py-10'>
//         <h1 className='text-2xl md:text-3xl font-semibold mb-1'>
//           Complete Your Listing Payment
//         </h1>

//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
//           {/* LEFT SIDE */}
//           <div className='lg:col-span-2 space-y-6'>
//             {/* Listing Type */}
//             <div className='bg-white rounded-xl shadow-sm border p-5'>
//               <h3 className='font-semibold mb-4'>Choose Your Listing Type</h3>
//               <div className='flex gap-3 flex-wrap'>
//                 {['Premium', 'Quick Sell', 'Standard'].map((type) => (
//                   <button
//                     key={type}
//                     onClick={() => setListingType(type)}
//                     className={`px-4 py-2 rounded-lg border text-sm transition
//                       ${
//                         listingType === type
//                           ? 'bg-blue-600 text-white border-blue-600'
//                           : 'bg-gray-100'
//                       }`}
//                   >
//                     {type} Listing
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Listings Count */}
//             <div className='bg-white rounded-xl shadow-sm border p-5'>
//               <h3 className='font-semibold mb-4'>Choose Number of Listings</h3>
//               <div className='flex gap-3 flex-wrap'>
//                 {listingOptions.map((num) => (
//                   <button
//                     key={num}
//                     onClick={() => setListings(num)}
//                     className={`px-4 py-2 rounded-lg border text-sm transition
//                       ${
//                         listings === num
//                           ? 'bg-blue-600 text-white border-blue-600'
//                           : 'bg-gray-100'
//                       }`}
//                   >
//                     {num}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE - SUMMARY */}
//           <div className='bg-white rounded-xl shadow-sm border p-5 h-fit'>
//             <h3 className='font-semibold mb-4'>Order Summary</h3>

//             <div className='space-y-3 text-sm'>
//               <div className='flex justify-between'>
//                 <span>Plan</span>
//                 <span>{listingType}</span>
//               </div>

//               <div className='flex justify-between'>
//                 <span>Listings</span>
//                 <span>{listings}</span>
//               </div>

//               <div className='flex justify-between'>
//                 <span>Subtotal</span>
//                 <span>{subtotal} ZMW</span>
//               </div>

//               <div className='flex justify-between'>
//                 <span>Service Fee</span>
//                 <span>{serviceFee} ZMW</span>
//               </div>

//               <div className='border-t pt-3 flex justify-between font-semibold text-base'>
//                 <span>Total</span>
//                 <span>{total} ZMW</span>
//               </div>
//             </div>

//             <div className='mt-6'>
//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50'
//               >
//                 {loading ? 'Processing...' : 'Pay Now'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
