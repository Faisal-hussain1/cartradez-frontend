'use client';

import Link from 'next/link';
import {useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {AUTH_ROUTES, USER_ROUTES} from '@/shared/constants/PATHS';
import {FormModal} from '@/shared/components/common/modals';
import {postRequest} from '@/shared/utils/requests';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {showToast} from '@/shared/utils/toasts';

export default function SellCarChoice() {
  const router = useLocaleRouter();
  const currentUser: any = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);
  const [isManagedModalOpen, setIsManagedModalOpen] = useState(false);
  const [isSubmittingManagedRequest, setIsSubmittingManagedRequest] =
    useState(false);
  const [managedForm, setManagedForm] = useState({
    make: '',
    model: '',
    year: '',
    location: '',
    message: '',
  });

  const handlePostAd = () => {
    if (!isLoggedIn) {
      router.push(AUTH_ROUTES.login);
      return;
    }

    router.push(USER_ROUTES.addVehicle);
  };

  const handleOpenManagedModal = () => {
    if (!isLoggedIn) {
      router.push(AUTH_ROUTES.login);
      return;
    }

    setIsManagedModalOpen(true);
  };

  const handleManagedChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setManagedForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmitManagedRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !managedForm.make.trim() ||
      !managedForm.model.trim() ||
      !managedForm.year.trim() ||
      !managedForm.location.trim() ||
      !managedForm.message.trim()
    ) {
      showToast({
        type: 'error',
        message: 'Make, model, year, location, and message are required.',
      });
      return;
    }

    const userEmail = String(currentUser?.email || '').trim();
    const userPhone = String(
      currentUser?.phoneNumber || currentUser?.phone || ''
    ).trim();
    if (!userEmail) {
      showToast({
        type: 'error',
        message: 'Logged in user email is required to submit this request.',
      });
      return;
    }

    const requesterName = String(
      currentUser?.name ||
        currentUser?.fullName ||
        currentUser?.firstName ||
        currentUser?.username ||
        'CarTradez User'
    ).trim();

    const composedMessage = [
      'Managed by CarTradez request',
      `Make: ${managedForm.make}`,
      `Model: ${managedForm.model}`,
      `Year: ${managedForm.year}`,
      `Location: ${managedForm.location}`,
      `Message: ${managedForm.message}`,
    ].join('\n');

    try {
      setIsSubmittingManagedRequest(true);

      const response = await postRequest({
        endpoint: API_ENDPOINTS.PUBLIC.CONTACT,
        payload: {
          name: requesterName,
          email: userEmail,
          phone: userPhone,
          message: composedMessage,
        },
      });

      showToast({
        type: 'success',
        message:
          response?.data?.message || 'Managed by CarTradez request submitted.',
      });

      setManagedForm({
        make: '',
        model: '',
        year: '',
        location: '',
        message: '',
      });
      setIsManagedModalOpen(false);
    } catch (error: any) {
      showToast({
        type: 'error',
        message:
          error?.message || 'Failed to submit managed request. Please try again.',
      });
    } finally {
      setIsSubmittingManagedRequest(false);
    }
  };

  return (
    <section className='flex-center px-4 py-16 bg-background font-sans'>
      <div className='w-full max-w-6xl rounded-lg bg-card shadow-sm border'>
        <div className='text-center py-8 px-6 border-b'>
          <h2 className='text-2xl font-semibold text-primary'>
            Sell Your Car on CarTradez and Get the Best Price
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className='p-8 flex flex-col items-center text-center space-y-6'>
            <h3 className='text-xl font-semibold text-primary'>
              Individual User
            </h3>

            <ul className='flex flex-col items-start gap-2 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Post an ad in 2 minutes
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Reach thousands of buyers
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Connect directly with buyers
              </li>
            </ul>

            <button
              onClick={handlePostAd}
              className='mt-4 inline-flex items-center justify-center cursor-pointer rounded-md bg-primary2 px-6 py-3 text-white font-medium hover:opacity-90 transition'
            >
              Post Your Ad
            </button>
          </div>

          <div className='p-8 flex flex-col items-center text-center space-y-6 border-t md:border-t-0 md:border-l'>
            <h3 className='text-xl font-semibold text-primary'>
              Become a Dealer
            </h3>

            <ul className='flex flex-col items-start gap-2 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Sell cars professionally
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Verified dealer profile
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Premium listing exposure
              </li>
            </ul>

            <Link
              href='/dealer-requestform'
              className='mt-4 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition'
            >
              Become a Dealer
            </Link>
          </div>

          <div className='p-8 flex flex-col items-center text-center space-y-6 border-t md:border-t-0 md:border-l'>
            <h3 className='text-xl font-semibold text-primary'>
              Managed by CarTradez
            </h3>

            <ul className='flex flex-col items-start gap-2 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Vehicle inspection support
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Professional listing assistance
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✓</span>
                Buyer coordination support
              </li>
            </ul>

            <button
              onClick={handleOpenManagedModal}
              className='mt-4 inline-flex items-center justify-center cursor-pointer rounded-md bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition'
            >
              Request Management
            </button>
          </div>
        </div>
      </div>

      <FormModal
        title='Managed by CarTradez Request'
        isOpen={isManagedModalOpen}
        setIsOpen={setIsManagedModalOpen}
        isModalCloseWhenClickedOutside={false}
        content={[
          <form
            key='managed-cartradez-form'
            onSubmit={handleSubmitManagedRequest}
            className='space-y-4 mt-2'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
              <label className='block text-sm font-medium mb-1 text-gray-800'>
                Vehicle Make
              </label>
              <input
                type='text'
                name='make'
                value={managedForm.make}
                onChange={handleManagedChange}
                placeholder='Enter vehicle make'
                required
                className='w-full mt-1 h-11 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none'
              />
              </div>

              <div>
              <label className='block text-sm font-medium mb-1 text-gray-800'>
                Vehicle Model
              </label>
              <input
                type='text'
                name='model'
                value={managedForm.model}
                onChange={handleManagedChange}
                placeholder='Enter vehicle model'
                required
                className='w-full mt-1 h-11 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none'
              />
              </div>

              <div>
              <label className='block text-sm font-medium mb-1 text-gray-800'>
                Vehicle Year
              </label>
              <input
                type='number'
                name='year'
                value={managedForm.year}
                onChange={handleManagedChange}
                placeholder='Enter vehicle year'
                min='1900'
                max='2026'
                required
                className='w-full mt-1 h-11 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none'
              />
              </div>

              <div>
              <label className='block text-sm font-medium mb-1 text-gray-800'>Location</label>
              <input
                type='text'
                name='location'
                value={managedForm.location}
                onChange={handleManagedChange}
                placeholder='Enter location'
                required
                className='w-full mt-1 h-11 px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none'
              />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1 text-gray-800'>Message</label>
              <textarea
                name='message'
                value={managedForm.message}
                onChange={handleManagedChange}
                placeholder='Write your message'
                rows={4}
                required
                className='w-full mt-1 px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary focus:outline-none resize-none'
              />
            </div>

            <div className='flex justify-end gap-3 pt-2'>
              <button
                type='button'
                onClick={() => setIsManagedModalOpen(false)}
                className='inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-primary font-medium hover:bg-primary/5 transition cursor-pointer'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmittingManagedRequest}
                className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-medium hover:opacity-90 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isSubmittingManagedRequest ? 'Sending...' : 'Submit Request'}
              </button>
            </div>
          </form>,
        ]}
      />
    </section>
  );
}
