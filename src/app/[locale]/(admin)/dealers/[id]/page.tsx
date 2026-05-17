'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {getRequest, patchRequest} from '@/shared/utils/requests';
import {showToast} from '@/shared/utils/toasts';

type DealerHistory = {
  status: string;
  reason?: string | null;
  updatedAt: string;
};

type Dealer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  address?: string;
  showroomName?: string;
  showroomAddress?: string;
  nrcNo?: string;
  ntnNo?: string;
  experience?: number;
  carTypes?: string;
  dealerStatus: string;
  dealerStatusHistory?: DealerHistory[];
};

export default function DealerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDealer = async () => {
    setLoading(true);
    try {
      const res: any = await getRequest({endpoint: `/users/dealers/${id}`});
      setDealer(res?.data?.data || null);
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to fetch dealer detail'});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDealer();
  }, [id]);

  const updateStatus = async (status: 'approved' | 'rejected') => {
    if (!dealer?._id) return;
    if (status === 'rejected' && !rejectReason.trim()) {
      showToast({type: 'error', message: 'Reject reason is required'});
      return;
    }

    setActionLoading(true);
    try {
      await patchRequest({
        endpoint: `/users/dealers/${dealer._id}/status`,
        payload: {
          status,
          rejectReason: status === 'rejected' ? rejectReason.trim() : undefined,
        },
      });
      showToast({
        type: 'success',
        message: status === 'approved' ? 'Dealer approved successfully' : 'Dealer rejected successfully',
      });
      setRejectReason('');
      fetchDealer();
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to update status'});
    } finally {
      setActionLoading(false);
    }
  };

  const canApproveDealer = (dealer: Dealer) =>
    dealer.dealerStatus !== 'approved' &&
    (Boolean(dealer.showroomName?.trim()) || Boolean(dealer.ntnNo?.trim()));
  const canRejectDealer = (dealer: Dealer) =>
    dealer.dealerStatus === 'pending' || dealer.dealerStatus === 'approved';

  if (loading) return <div className='p-6 text-sm text-gray-500'>Loading dealer details...</div>;
  if (!dealer) return <div className='p-6 text-sm text-gray-500'>Dealer not found.</div>;

  return (
    <div className='p-6'>
      <h1 className='mb-5 text-2xl font-semibold text-gray-900'>Dealer Detail</h1>

      <div className='rounded-lg border border-gray-200 bg-white p-5'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Field label='Name' value={`${dealer.firstName} ${dealer.lastName}`} />
          <Field label='Email' value={dealer.email} />
          <Field label='Phone' value={dealer.phoneNumber || '-'} />
          <Field label='City' value={dealer.city || '-'} />
          <Field label='Address' value={dealer.address || '-'} />
          <Field label='Status' value={dealer.dealerStatus || '-'} />
          <Field label='Showroom Name' value={dealer.showroomName || '-'} />
          <Field label='Showroom Address' value={dealer.showroomAddress || '-'} />
          <Field label='NRC No' value={dealer.nrcNo || '-'} />
          <Field label='NTN No' value={dealer.ntnNo || '-'} />
          <Field label='Experience' value={String(dealer.experience ?? 0)} />
          <Field label='Car Types' value={dealer.carTypes || '-'} />
        </div>

        <div className='mt-6 rounded border border-gray-200 p-3'>
          <h2 className='text-base font-semibold text-gray-900'>Decision Actions</h2>
          <textarea
            className='mt-3 h-24 w-full rounded border border-gray-300 p-2 text-sm'
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder='Required only for rejection'
          />
          <div className='mt-3 flex gap-2'>
           {canApproveDealer (dealer) && (
             <button
              disabled={actionLoading}
              className='rounded bg-green-600 px-4 py-2 text-sm text-white disabled:opacity-50'
              onClick={() => updateStatus('approved')}
            >
              Approve Dealer
            </button>
           )}
            {canRejectDealer(dealer) && (
              <button
              disabled={actionLoading}
              className='rounded bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50'
              onClick={() => updateStatus('rejected')}
            >
              Reject Dealer
            </button>
            )}
          </div>
        </div>
      </div>

      <div className='mt-5 rounded-lg border border-gray-200 bg-white p-5'>
        <h2 className='text-base font-semibold text-gray-900'>History</h2>
        {!dealer.dealerStatusHistory?.length && (
          <p className='mt-2 text-sm text-gray-500'>No history found.</p>
        )}
        {!!dealer.dealerStatusHistory?.length && (
          <div className='mt-3 space-y-2'>
            {dealer.dealerStatusHistory
              .slice()
              .reverse()
              .map((item, index) => (
                <div key={`${item.updatedAt}-${index}`} className='rounded border border-gray-100 p-3 text-sm'>
                  <p className='font-medium capitalize text-gray-900'>Status: {item.status}</p>
                  <p className='text-gray-500'>
                    Date: {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}
                  </p>
                  {item.reason ? <p className='text-gray-700'>Reason: {item.reason}</p> : null}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({label, value}: {label: string; value: string}) {
  return (
    <div>
      <p className='text-sm text-gray-500'>{label}</p>
      <p className='text-sm font-medium text-gray-900'>{value}</p>
    </div>
  );
}
