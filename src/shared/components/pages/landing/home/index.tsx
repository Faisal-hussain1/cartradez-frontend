'use client';

import HomeVehicles from './vehicles';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import {LIST_TYPES} from '@/shared/constants/general';
import {vehiclesQueries} from '@/shared/reactQuery';
import {CartradezVehicle, Vehicle} from '@/shared/interfaces/common';
import FiltersBar from '@/shared/components/common/FilterBar';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {FilterSearchIcon} from '@/shared/components/icons';
import Container from '@/shared/components/common/containers';
import ManagedByCartradezVehicles from './ManagedByCartradezVehicles';
import { getCurrentUser } from '@/shared/redux/slices/users';
import { useDispatch, useSelector } from 'react-redux';
const API_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1` as string;
import { useEffect, useState } from 'react';
import PolicyModal from '@/shared/components/policymodal';
import {actions} from '@/shared/redux/slices/users';
import { AppDispatch } from '@/shared/redux/store';

export default function Home() {
  const user=useSelector(getCurrentUser);
  const {useFetchAllVehicleList, useFetchAllCartradezVehicleList} =
    vehiclesQueries();
    const dispatch=useDispatch<AppDispatch>();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Vehicle>({
      dataKey: 'vehicles',
      listType: LIST_TYPES.homePageVehicles,
      queryToCall: useFetchAllVehicleList,
    });

  const {
    filteredData: managedByCartradezVehicles,
    isLoading: getCartradezVehiclesLoading,
  } = useServerSideListFilters<CartradezVehicle>({
    dataKey: 'vehicles',
    listType: LIST_TYPES.managedByCartradezVehicles,
    queryToCall: useFetchAllCartradezVehicleList,
  });
   const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (user) {
      if (!user?.privacyAccepted) {
        setShowPrivacy(true);
      } else if (!user?.termsAccepted) {
        setShowTerms(true);
      }
    }
  }, [user]);

  const handlePrivacyAccept = async () => {
    const res=await fetch(`${API_URL}/users/accept-terms`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});
    const data=await res.json();
     dispatch(actions.setCurrentUser(data?.user))
    setShowPrivacy(false);

    if (!user?.termsAccepted) {
      setShowTerms(true);
    }
  };

  const handleTermsAccept = async () => {
    const res=await fetch(`${API_URL}/users/accept-privacy`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("accessToken")}`}});
    const data=await res.json();
    dispatch(actions.setCurrentUser(data?.user))
    setShowTerms(false);
  };

  console.log(user)
  // const {data, isPending, error} = useFetchAllVehicleList();

  // console.log('Home filteredData:', filteredData);

  // console.log('data', data);

  return (
    <div>
      <div className="w-full h-[300px] bg-[url('/images/home/banner.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className='w-[85%] max-w-6xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-6'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <p className='text-2xl text-primary font-semibold'>
                Find the Car You’ll Love
              </p>
            </div>
          </div>

          <div className='grid grid-cols-12  gap-1 md:gap-3 mt-5'>
            <div className='col-span-12 md:col-span-9'>
              <FiltersBar
                setFilters={setFilters}
                filters={filters}
                hideSelect={true}
                placeholder='Search by Make or Model'
                redirectPath='/advancedFilter'
              />
            </div>

            <div className='col-span-12 md:col-span-3 flex justify-center md:justify-end'>
              <PrimaryButton
                buttonText={
                  <>
                    <FilterSearchIcon className='h-6 w-6' />
                    {'Advanced Filters'}
                  </>
                }
                styles='h-[48px] bg-white text-primary hover:text-white'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center mb-10'>
        <Container>
          <div className='grid grid-cols-12 gap-6 md:gap-6 mt-8'>
            {/* 🔹 Left Section — Vehicle Listing */}
            <div className='col-span-12 md:col-span-9 w-full flex justify-between'>
              <HomeVehicles
                PaginationComponent={PaginationComponent}
                filteredData={filteredData || []}
                isLoading={isLoading}
              />
            </div>

            <div className='col-span-12 md:col-span-3 bg-[#E5E7EB] p-5 rounded-2xl flex flex-col gap-4'>
              <ManagedByCartradezVehicles
                vehicles={managedByCartradezVehicles}
                isLoading={getCartradezVehiclesLoading}
              />
            </div>
          </div>
        </Container>
      </div>
      {/* Privacy Modal */}
{showPrivacy && (
  <PolicyModal
    title="Privacy Policy"
    onAccept={handlePrivacyAccept}
    content={
      <>
        <p>
        CarTradez collects personal information such as name, email, phone number,
        location, CNIC, and transaction details to provide and improve services.
      </p>

      <h2 className="font-semibold text-lg">Who We Are</h2>
      <p>CarTradez is an online car selling and buying platform that allows users to browse, list, inquire
about, purchase, and/or sell vehicles through our website and associated channels.
If you have any questions about this Privacy Policy, you may contact us at:
</p>

<p>Company Name: Car Tradez
Email: [Insert Email Address]
Phone: [Insert Phone Number]
Address: [Insert Office Address]</p>

      <h2 className="font-semibold text-lg">Information We Collect</h2>
      <ul className="list-disc ml-5">
        <li>Personal Information (Name, Email, Phone)</li>
        <li>Account Data (Username, Login Activity)</li>
        <li>Vehicle Listings Data</li>
        <li>Transaction Details</li>
        <li>Technical Data (IP, Browser, Cookies)</li>
      </ul>

      <h2 className="font-semibold text-lg">How We Use Data</h2>
      <ul className="list-disc ml-5">
        <li>Account management</li>
        <li>Processing transactions</li>
        <li>Fraud prevention</li>
        <li>Improving user experience</li>
      </ul>

      <h2 className="font-semibold text-lg">Data Security</h2>
      <p>
        We apply industry-standard security measures, but no system is 100% secure.
      </p>

      <h2 className="font-semibold text-lg">Your Rights</h2>
      <p>
        You can request access, correction, or deletion of your data at any time.
      </p>
      </>
    }
  />
)}

{/* Terms Modal */}
{showTerms && (
  <PolicyModal
    title="Terms & Conditions"
    onAccept={handleTermsAccept}
    content={
      <>
        <p>
        By using CarTradez, you agree to comply with these Terms & Conditions.
      </p>

      <h2 className="font-semibold text-lg">User Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Provide accurate information</li>
        <li>Maintain account security</li>
        <li>Comply with laws</li>
      </ul>

      <h2 className="font-semibold text-lg">Platform Role</h2>
      <p>
        CarTradez may act as a marketplace or service provider but does not guarantee transactions.
      </p>

      <h2 className="font-semibold text-lg">Buyer Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Verify vehicle details</li>
        <li>Inspect before purchase</li>
      </ul>

      <h2 className="font-semibold text-lg">Seller Responsibilities</h2>
      <ul className="list-disc ml-5">
        <li>Provide accurate listing info</li>
        <li>Ensure legal ownership</li>
      </ul>

      <h2 className="font-semibold text-lg">Limitation of Liability</h2>
      <p>
        CarTradez is not liable for transaction failures, delays, or third-party issues.
      </p>
      </>
    }
  />
)}
    </div>
    
  );
}
