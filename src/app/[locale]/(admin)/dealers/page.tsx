'use client';

import {useEffect, useMemo, useState} from 'react';
import {getRequest, patchRequest} from '@/shared/utils/requests';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {showToast} from '@/shared/utils/toasts';

type Dealer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  address?: string;
  showroomName?: string;
  ntnNo?: string;
  systemRole: string;
  dealerStatus: 'pending' | 'approved' | 'rejected';
  dealerStatusHistory?: Array<{
    status: string;
    reason?: string | null;
    updatedAt?: string;
  }>;
};

export default function DealersPage() {
  const router = useLocaleRouter();
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [rejectDealerId, setRejectDealerId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const res: any = await getRequest({endpoint: '/users/dealers'});
      setDealers(res?.data?.data || []);
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to fetch dealers'});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleApprove = async (dealerId: string) => {
    setUpdatingId(dealerId);
    try {
      await patchRequest({
        endpoint: `/users/dealers/${dealerId}/status`,
        payload: {status: 'approved'},
      });
      showToast({type: 'success', message: 'Dealer approved successfully'});
      fetchDealers();
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to approve dealer'});
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmReject = async () => {
    if (!rejectDealerId) return;
    if (!rejectReason.trim()) {
      showToast({type: 'error', message: 'Reject reason is required'});
      return;
    }

    setUpdatingId(rejectDealerId);
    try {
      await patchRequest({
        endpoint: `/users/dealers/${rejectDealerId}/status`,
        payload: {status: 'rejected', rejectReason: rejectReason.trim()},
      });
      showToast({type: 'success', message: 'Dealer rejected successfully'});
      setRejectDealerId(null);
      setRejectReason('');
      fetchDealers();
    } catch (error: any) {
      showToast({type: 'error', message: error?.message || 'Failed to reject dealer'});
    } finally {
      setUpdatingId(null);
    }
  };

  const rows = useMemo(() => {
    return dealers.filter((dealer) => {
      const hasDealerIdentity =
        Boolean(dealer.showroomName?.trim()) ||
        Boolean(dealer.address?.trim()) ||
        Boolean(dealer.dealerStatusHistory?.length);

      return hasDealerIdentity;
    });
  }, [dealers]);

  const canApproveDealer = (dealer: Dealer) =>
    Boolean(dealer.showroomName?.trim()) || Boolean(dealer.ntnNo?.trim());
  const canRejectDealer = (dealer: Dealer) =>
    dealer.dealerStatus === 'pending' || dealer.dealerStatus === 'approved';

  return (
    <div className='p-6'>
      <div className='mb-5'>
        <h1 className='text-2xl font-semibold text-gray-900'>Dealers</h1>
        <p className='text-sm text-gray-500'>Manage dealer approvals and rejections.</p>
      </div>

      <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-50 text-left text-gray-600'>
            <tr>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3'>Email</th>
              <th className='px-4 py-3'>Showroom</th>
              <th className='px-4 py-3'>City</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              rows.map((dealer) => (
                <tr key={dealer._id} className='border-t border-gray-100'>
                  <td className='px-4 py-3 font-medium'>
                    {dealer.firstName} {dealer.lastName}
                  </td>
                  <td className='px-4 py-3 text-gray-600'>{dealer.email}</td>
                  <td className='px-4 py-3 text-gray-600'>{dealer.showroomName || '-'}</td>
                  <td className='px-4 py-3 text-gray-600'>{dealer.city || '-'}</td>
                  <td className='px-4 py-3'>
                    <span className='rounded-full bg-gray-100 px-3 py-1 text-xs capitalize'>
                      {dealer.dealerStatus || 'pending'}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex justify-end gap-2'>
                      <button
                        className='rounded bg-blue-600 px-3 py-1.5 text-xs text-white'
                        onClick={() => router.push(`/dealers/${dealer._id}`)}
                      >
                        View
                      </button>
                      {canApproveDealer(dealer) && (
                        <button
                          disabled={updatingId === dealer._id}
                          className='rounded bg-green-600 px-3 py-1.5 text-xs text-white disabled:opacity-50'
                          onClick={() => handleApprove(dealer._id)}
                        >
                          Approve
                        </button>
                      )}
                      {canRejectDealer(dealer) && (
                        <button
                          disabled={updatingId === dealer._id}
                          className='rounded bg-red-600 px-3 py-1.5 text-xs text-white disabled:opacity-50'
                          onClick={() => setRejectDealerId(dealer._id)}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <div className='p-6 text-sm text-gray-500'>Loading dealers...</div>}
        {!loading && !rows.length && (
          <div className='p-6 text-sm text-gray-500'>No dealer records found.</div>
        )}
      </div>

      {rejectDealerId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
          <div className='w-full max-w-md rounded-lg bg-white p-5'>
            <h2 className='text-lg font-semibold text-gray-900'>Reject Dealer</h2>
            <p className='mt-1 text-sm text-gray-600'>Please provide a rejection reason.</p>
            <textarea
              className='mt-3 h-24 w-full rounded border border-gray-300 p-2 text-sm'
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder='Reason for rejection'
            />
            <div className='mt-4 flex justify-end gap-2'>
              <button
                className='rounded border border-gray-300 px-3 py-1.5 text-sm'
                onClick={() => {
                  setRejectDealerId(null);
                  setRejectReason('');
                }}
              >
                Cancel
              </button>
              <button
                className='rounded bg-red-600 px-3 py-1.5 text-sm text-white'
                onClick={confirmReject}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
