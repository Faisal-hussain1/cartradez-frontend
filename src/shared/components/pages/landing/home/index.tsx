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
        <strong>Effective Date:</strong> April,15,2026
      </p>

      <p>
        Welcome to CarTradez. Your privacy is important to us. This Privacy
        Policy explains how CarTradez collects, uses, stores, shares, and
        protects your personal information when you use our website, mobile
        platform, and related services.
      </p>

      <p>
        By accessing or using CarTradez, you agree to the terms of this Privacy
        Policy.
      </p>

      <h2 className="font-semibold text-lg mt-6">1. Who We Are</h2>
      <p>
        CarTradez is an online car selling and buying platform that allows users
        to browse, list, inquire about, purchase, and/or sell vehicles through
        our website and associated channels.
      </p>

      <p>If you have any questions about this Privacy Policy, you may contact us at:</p>

      <p>
        <strong>Company Name:</strong> Car Tradez <br />
        <strong>Email:</strong> Cartradez@gmail.com<br />
        <strong>Phone:</strong>  +260 977 123 456 <br />
        <strong>Address:</strong> NO.14089, Rockfield Chalaia, Lusaka, Zambia
      </p>

      <h2 className="font-semibold text-lg mt-6">2. Information We Collect</h2>
      <p>We may collect the following categories of information:</p>

      <h3 className="font-semibold text-base mt-4">a) Personal Information</h3>
      <p>When you use our platform, we may collect:</p>
      <ul className="list-disc ml-5">
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>City / location</li>
        <li>Address</li>
        <li>CNIC / National ID / Tax ID, where required</li>
        <li>Payment-related information</li>
        <li>Vehicle purchase/sale preferences</li>
        <li>Inquiry and communication history</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">b) Account Information</h3>
      <p>If you create an account, we may collect:</p>
      <ul className="list-disc ml-5">
        <li>Username</li>
        <li>Password</li>
        <li>Login activity</li>
        <li>Saved searches</li>
        <li>Wishlist / shortlisted vehicles</li>
        <li>Listing activity</li>
        <li>Profile information</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">c) Vehicle Listing Information</h3>
      <p>If you post or manage a listing, we may collect:</p>
      <ul className="list-disc ml-5">
        <li>Vehicle make, model, year, mileage, condition</li>
        <li>VIN / chassis number, where applicable</li>
        <li>Registration details</li>
        <li>Photos, documents, inspection details</li>
        <li>Ownership information</li>
        <li>Pricing details</li>
        <li>Service history, where provided</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">d) Transaction Information</h3>
      <p>
        If you purchase, sell, or request services through CarTradez, we may
        collect:
      </p>
      <ul className="list-disc ml-5">
        <li>Booking details</li>
        <li>Advance payment details</li>
        <li>Refund details</li>
        <li>Delivery/service information</li>
        <li>Vehicle inspection or verification records</li>
        <li>Invoices and order records</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">e) Technical Information</h3>
      <p>We may automatically collect:</p>
      <ul className="list-disc ml-5">
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Operating system</li>
        <li>Pages visited</li>
        <li>Time spent on pages</li>
        <li>Click behavior</li>
        <li>Referral source</li>
        <li>Cookies and analytics data</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-5">
        <li>Create and manage your account</li>
        <li>Display and manage vehicle listings</li>
        <li>Process inquiries, and transactions</li>
        <li>Verify seller or buyer identity where needed</li>
        <li>Provide inspection, logistics, support, or related services</li>
        <li>Improve website performance and user experience</li>
        <li>
          Communicate with you regarding listings, purchases, updates, and
          support
        </li>
        <li>Send transactional emails, alerts, or notifications</li>
        <li>Prevent fraud, misuse, or unauthorized activity</li>
        <li>Comply with legal and regulatory obligations</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">4. Sharing of Information</h2>
      <p>We may share your information in the following situations:</p>

      <h3 className="font-semibold text-base mt-4">a) With Buyers and Sellers</h3>
      <p>
        To facilitate transactions, inquiries, bookings, and sales, some
        information may be shared between buyers and sellers, such as:
      </p>
      <ul className="list-disc ml-5">
        <li>Name</li>
        <li>Contact number</li>
        <li>Vehicle-related communication</li>
        <li>Delivery or service coordination details</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">b) With Service Providers</h3>
      <p>
        We may share information with trusted third parties who help us operate
        the platform, including:
      </p>
      <ul className="list-disc ml-5">
        <li>Payment processors</li>
        <li>Hosting providers</li>
        <li>Inspection partners</li>
        <li>Delivery/logistics partners</li>
        <li>Customer support tools</li>
        <li>Analytics providers</li>
        <li>Marketing service providers</li>
      </ul>

      <h3 className="font-semibold text-base mt-4">c) With Legal Authorities</h3>
      <p>
        We may disclose your information where required by law, regulation,
        legal process, or to protect our rights, users, platform, or the public.
      </p>

      <h3 className="font-semibold text-base mt-4">d) Business Transfers</h3>
      <p>
        If CarTradez is involved in a merger, acquisition, restructuring, or
        sale of assets, your information may be transferred as part of that
        transaction.
      </p>

      <h2 className="font-semibold text-lg mt-6">
        5. Cookies and Tracking Technologies
      </h2>
      <p>We may use cookies, and similar technologies to:</p>
      <ul className="list-disc ml-5">
        <li>Keep you logged in</li>
        <li>Remember your preferences</li>
        <li>Analyze traffic and usage</li>
        <li>Improve performance</li>
        <li>Personalize content and ads</li>
      </ul>
      <p>
        You may disable cookies through your browser settings, but some features
        of the website may not function properly.
      </p>

      <h2 className="font-semibold text-lg mt-6">6. Data Retention</h2>
      <p>We retain your information only for as long as necessary to:</p>
      <ul className="list-disc ml-5">
        <li>Provide our services</li>
        <li>Maintain business records</li>
        <li>Resolve disputes</li>
        <li>Prevent fraud</li>
        <li>Enforce agreements</li>
        <li>Comply with legal obligations</li>
      </ul>
      <p>
        We may keep certain records even after account closure where required
        for compliance, auditing, or dispute handling.
      </p>

      <h2 className="font-semibold text-lg mt-6">7. Data Security</h2>
      <p>
        We use reasonable technical, administrative, and organizational measures
        to protect your information from unauthorized access, misuse, loss,
        disclosure, or alteration.
      </p>
      <p>
        However, no online platform can guarantee absolute security. You use the
        platform at your own risk.
      </p>

      <h2 className="font-semibold text-lg mt-6">8. Your Rights</h2>
      <p>
        Depending on your location and applicable laws, you may have the right
        to:
      </p>
      <ul className="list-disc ml-5">
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Object to certain processing</li>
        <li>Withdraw consent where applicable</li>
        <li>Request a copy of your data</li>
      </ul>
      <p>
        To exercise these rights, contact us at [Insert Email Address].
      </p>

      <h2 className="font-semibold text-lg mt-6">9. Third-Party Links</h2>
      <p>
        Our platform may contain links to third-party websites, services, or
        dealer pages. We are not responsible for the privacy practices, content,
        or security of third-party websites.
      </p>

      <h2 className="font-semibold text-lg mt-6">10. Children’s Privacy</h2>
      <p>
        CarTradez is not intended for individuals under the age of 18. We do
        not knowingly collect personal information from children.
      </p>

      <h2 className="font-semibold text-lg mt-6">11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Updated versions
        will be posted on this page with the revised effective date.
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
        <strong>Effective Date:</strong> April,15,2026
      </p>

      <p>
        Welcome to CarTradez. These Terms & Conditions govern your access to and
        use of our website, platform, services, listings, and related features.
      </p>

      <p>
        By using CarTradez, you agree to be legally bound by these Terms &
        Conditions. If you do not agree, please do not use the platform.
      </p>

      <h2 className="font-semibold text-lg mt-6">1. Definitions</h2>
      <p>In these Terms:</p>
      <ul className="list-disc ml-5">
        <li>
          “CarTradez”, “we”, “our”, or “us” refers to Cartradez Investment Limited.
        </li>
        <li>
          “User”, “you”, or “your” refers to any person who visits, registers,
          browses, lists, buys, sells, or interacts with the platform.
        </li>
        <li>
          “Seller” means a person, dealer, or entity listing or selling a
          vehicle.
        </li>
        <li>
          “Buyer” means a person interested in or purchasing a vehicle.
        </li>
        <li>
          “Platform” means the CarTradez website, app, and related services.
        </li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">2. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally capable of entering
        binding agreements to use this platform.
      </p>
      <p>By using CarTradez, you represent that:</p>
      <ul className="list-disc ml-5">
        <li>the information you provide is accurate,</li>
        <li>
          you have the authority to act on behalf of yourself or your business,
        </li>
        <li>your use of the platform complies with applicable law.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">3. Platform Role</h2>
      <p>CarTradez may operate as:</p>
      <ul className="list-disc ml-5">
        <li>a direct vehicle seller,</li>
        <li>a marketplace connecting buyers and sellers,</li>
        <li>
          a service provider offering inspection, listing, or logistics support,
        </li>
        <li>or a combination of these.</li>
      </ul>
      <p>
        Unless explicitly stated otherwise, CarTradez does not guarantee that
        every listing will result in a sale or that every seller/buyer will
        complete a transaction.
      </p>

      <h2 className="font-semibold text-lg mt-6">4. User Accounts</h2>
      <p>To access certain services, users may need to create an account.</p>
      <p>You are responsible for:</p>
      <ul className="list-disc ml-5">
        <li>maintaining account confidentiality,</li>
        <li>securing your password,</li>
        <li>ensuring all account information is accurate,</li>
        <li>all activity under your account.</li>
      </ul>
      <p>
        CarTradez reserves the right to suspend or terminate accounts that
        contain false information, suspicious activity, abuse, fraud, or policy
        violations.
      </p>

      <h2 className="font-semibold text-lg mt-6">5. Listings and Vehicle Information</h2>
      <p>
        Sellers are solely responsible for the accuracy, legality, completeness,
        and truthfulness of their listings, including:
      </p>
      <ul className="list-disc ml-5">
        <li>vehicle condition,</li>
        <li>ownership,</li>
        <li>documentation,</li>
        <li>mileage,</li>
        <li>features,</li>
        <li>accident history,</li>
        <li>pricing,</li>
        <li>availability.</li>
      </ul>
      <p>
        CarTradez may review, edit, reject, remove, or disable any listing at
        its discretion without prior notice.
      </p>

      <h2 className="font-semibold text-lg mt-6">6. Pricing and Payments</h2>
      <p>
        Prices displayed on the platform may change without notice unless a
        transaction has already been confirmed under agreed terms.
      </p>
      <p>Payments made through CarTradez may include:</p>
      <ul className="list-disc ml-5">
        <li>token/booking amount,</li>
        <li>inspection fee,</li>
        <li>service fee,</li>
        <li>transport fee,</li>
        <li>full or partial purchase payments.</li>
      </ul>
      <p>Users agree that:</p>
      <ul className="list-disc ml-5">
        <li>all payment details provided are accurate,</li>
        <li>unauthorized payment methods will not be used,</li>
        <li>CarTradez may suspend transactions pending verification.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">7. Buyer Responsibility</h2>
      <p>Buyers are responsible for:</p>
      <ul className="list-disc ml-5">
        <li>reviewing listing details,</li>
        <li>verifying vehicle condition and documents,</li>
        <li>conducting inspections where needed,</li>
        <li>confirming legal ownership,</li>
        <li>
          understanding the applicable refund and service policies before
          paying.
        </li>
      </ul>
      <p>
        A buyer should not rely solely on listing text or photographs when
        making a purchase decision.
      </p>

      <h2 className="font-semibold text-lg mt-6">8. Seller Responsibility</h2>
      <p>Sellers agree that:</p>
      <ul className="list-disc ml-5">
        <li>they have the legal right to list and sell the vehicle,</li>
        <li>the vehicle details are accurate,</li>
        <li>no misleading claims will be made,</li>
        <li>
          they will cooperate in documentation, verification, and lawful
          transfer,
        </li>
        <li>
          they will not post stolen, prohibited, or fraudulently represented
          vehicles.
        </li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">9. Prohibited Conduct</h2>
      <p>Users must not:</p>
      <ul className="list-disc ml-5">
        <li>post false, misleading, or fraudulent listings,</li>
        <li>impersonate another person or business,</li>
        <li>misuse another user’s data,</li>
        <li>interfere with website security,</li>
        <li>upload malicious code,</li>
        <li>manipulate prices or listings,</li>
        <li>use abusive, unlawful, defamatory, or offensive content,</li>
        <li>attempt unauthorized payments or chargebacks,</li>
        <li>violate any applicable law or regulation.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">10. Intellectual Property</h2>
      <p>
        All content on CarTradez, including logos, branding, design, text,
        graphics, software, and website structure, is owned by or licensed to
        CarTradez and is protected by intellectual property laws.
      </p>
      <p>
        You may not reproduce, copy, distribute, modify, scrape, republish, or
        commercially exploit any part of the platform without written
        permission.
      </p>

      <h2 className="font-semibold text-lg mt-6">11. Third-Party Services and Links</h2>
      <p>
        CarTradez may include links to or integrations with third-party
        providers such as:
      </p>
      <ul className="list-disc ml-5">
        <li>payment gateways,</li>
        <li>logistics providers,</li>
        <li>inspection partners,</li>
        <li>finance or insurance providers,</li>
        <li>external dealer websites.</li>
      </ul>
      <p>
        We are not responsible for third-party content, services, actions,
        availability, or terms.
      </p>

      <h2 className="font-semibold text-lg mt-6">12. No Warranty</h2>
      <p>
        CarTradez provides the platform and services on an “as is” and “as
        available” basis.
      </p>
      <p>To the maximum extent permitted by law, we do not guarantee:</p>
      <ul className="list-disc ml-5">
        <li>uninterrupted access,</li>
        <li>error-free operation,</li>
        <li>perfect listing accuracy,</li>
        <li>seller or buyer performance,</li>
        <li>hidden mechanical condition,</li>
        <li>future vehicle performance,</li>
        <li>exact delivery dates,</li>
        <li>availability of all services in all regions.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">13. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, CarTradez shall not be liable
        for:
      </p>
      <ul className="list-disc ml-5">
        <li>indirect or consequential losses,</li>
        <li>loss of profit,</li>
        <li>lost opportunities,</li>
        <li>transaction failure between buyer and seller,</li>
        <li>misrepresentation by users,</li>
        <li>hidden defects in vehicles,</li>
        <li>delays caused by third parties,</li>
        <li>document transfer delays,</li>
        <li>technical interruptions,</li>
        <li>unauthorized access caused by user negligence.</li>
      </ul>
      <p>
        In all cases, CarTradez’s total liability, if any, shall not exceed the
        amount directly paid to CarTradez for the relevant service giving rise
        to the claim.
      </p>

      <h2 className="font-semibold text-lg mt-6">14. Indemnification</h2>
      <p>
        You agree to indemnify and hold CarTradez, its directors, employees,
        affiliates, and partners harmless from claims, damages, liabilities,
        costs, and expenses arising from:
      </p>
      <ul className="list-disc ml-5">
        <li>your use of the platform,</li>
        <li>your listings,</li>
        <li>your breach of these Terms,</li>
        <li>your violation of law,</li>
        <li>disputes with buyers, sellers, or third parties.</li>
      </ul>

      <h2 className="font-semibold text-lg mt-6">15. Suspension and Termination</h2>
      <p>We reserve the right to:</p>
      <ul className="list-disc ml-5">
        <li>suspend or remove listings,</li>
        <li>restrict access,</li>
        <li>cancel bookings,</li>
        <li>withhold services,</li>
        <li>terminate accounts</li>
      </ul>
      <p>
        if we believe a user has violated these Terms, engaged in fraud, abused
        the platform, or posed legal or operational risk.
      </p>

      <h2 className="font-semibold text-lg mt-6">16. Governing Law</h2>
      <p>
        These Terms shall be governed by and interpreted in accordance with the
        laws of Zambia.
      </p>
      <p>
        Any disputes shall be subject to the exclusive jurisdiction of the
        courts located in Zambia, unless otherwise required by
        law.
      </p>

      <h2 className="font-semibold text-lg mt-6">17. Changes to Terms</h2>
      <p>
        We may revise these Terms & Conditions at any time. Updated versions
        will be posted on this page with the revised effective date. Continued
        use of the platform after changes means you accept the updated Terms.
      </p>
      </>
    }
  />
)}
    </div>
    
  );
}
