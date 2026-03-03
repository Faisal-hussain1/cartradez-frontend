"use client";

import { getCurrentUser } from "@/shared/redux/slices/users";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ListingPopUp({
  vehicle,
  onClose,
}: {
  vehicle: any;
  onClose: () => void;
}) {
  const [listingType, setListingType] = useState("Standard");
  const user=useSelector(getCurrentUser);
  const listingPrices: Record<string, number> = {
  Standard: 10,
  "Quick Sell": 15,
  Premium: 20,
};

  const price = listingPrices[listingType];
  const publishableKey="pk_test_51RKN9FQaNfqZpifiMJskjSfmcCdVhVMks73GTE7Ti9MG5nkg9T5w4a9cdeUDckrEEYXgoTdZzgFm5aLh8cQRsMCN00IOOjP2BE"
  
  const stripePromise = loadStripe(publishableKey);

  const pay=async(listingType:any,pricing:any)=>{
    try {
      const stripe = await stripePromise;
       if (!stripe) {
      console.error('Stripe failed to initialize');
      return;
    }
      
      const res = await fetch(`http://localhost:3001/api/v1/payment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
        userId: user?._id,
        vehicleId: vehicle?.vehicleId,
        currency: vehicle?.currency || "usd",
        image: vehicle?.coverImage?.url,
        make: vehicle?.make,
        model: vehicle?.model,
        listingType,
        price: pricing,   // ✅ send correct field name
      }),
      });
  
  
      const data = await res.json();  
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });
      if (error) {
        console.error('Stripe redirect error:', error);
      }
      
    } catch (err) {
      console.error('Payment error:', err);
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Select Listing Type
        </h2>

        {/* Select Input */}
        <select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Standard">Standard</option>
          <option value="Quick Sell">Quick Sell</option>
          <option value="Premium">Premium</option>
        </select>

        {/* Pay Button */}
        <button onClick={()=>pay(listingType,price)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Pay {price} {vehicle.currency}
        </button>
      </div>
    </div>
  );
}