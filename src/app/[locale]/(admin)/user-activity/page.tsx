'use client';

import {
  Activity,
  Ban,
  Car,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  UserRound,
  Users,
} from 'lucide-react';
import {useEffect, useMemo, useRef, useState} from 'react';
import Pagination from '@/shared/components/common/pagination';
import {PAGINATION_TYPES} from '@/shared/constants/general';
import useDebounce from '@/shared/hooks/useDebounce';
import {getRequest, patchRequest} from '@/shared/utils/requests';
import {showToast} from '@/shared/utils/toasts';

type ListingType = 'standard' | 'premium' | 'quick sell';
type UserRole = 'user' | 'dealer';
type UserAction = 'block' | 'unblock' | 'demote';

type Usage = {
  uploaded: number;
  limit: number;
  remaining: number;
};

type ActivityUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  city?: string | null;
  showroomName?: string | null;
  systemRole: UserRole;
  dealerStatus?: string;
  isBlocked: boolean;
  blockReason?: string | null;
  createdAt?: string;
  lastActivityAt?: string;
  vehicleUsage: Record<ListingType, Usage>;
  listingLimitOverrides: Record<ListingType, number | null>;
};

type ActivityResponse = {
  users: ActivityUser[];
  summary: {
    total: number;
    users: number;
    dealers: number;
    blocked: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  period: string;
};

const EMPTY_RESPONSE: ActivityResponse = {
  users: [],
  summary: {total: 0, users: 0, dealers: 0, blocked: 0},
  pagination: {page: 1, limit: 10, total: 0, totalPages: 0},
  period: '',
};

const LISTING_TYPES: Array<{key: ListingType; label: string}> = [
  {key: 'standard', label: 'Standard'},
  {key: 'premium', label: 'Premium'},
  {key: 'quick sell', label: 'Quick Sell'},
];
const ROLE_DEFAULT_LIMITS: Record<UserRole, Record<ListingType, number>> = {
  user: {premium: 1, 'quick sell': 1, standard: 1},
  dealer: {premium: 2, 'quick sell': 3, standard: 5},
};

const formatDate = (value?: string) => {
  if (!value) return 'No activity yet';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No activity yet';

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

function UsageCell({
  usage,
  compact = false,
}: {
  usage: Usage;
  compact?: boolean;
}) {
  const percentage = usage.limit
    ? Math.min((usage.uploaded / usage.limit) * 100, 100)
    : 0;

  return (
    <div className={compact ? 'min-w-0' : 'min-w-28'}>
      <div className='flex justify-between gap-2 text-xs'>
        <span className='font-medium text-gray-800'>
          {usage.uploaded}/{usage.limit}
        </span>
        <span className='text-gray-500'>{usage.remaining} left</span>
      </div>
      <div className='mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100'>
        <div
          className='h-full rounded-full bg-[#414279]'
          style={{width: `${percentage}%`}}
        />
      </div>
    </div>
  );
}

export default function UserActivityPage() {
  const [data, setData] = useState<ActivityResponse>(EMPTY_RESPONSE);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const [pendingAction, setPendingAction] = useState<{
    user: ActivityUser;
    action: UserAction;
  } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [blockReason, setBlockReason] = useState('');
  const [limitUser, setLimitUser] = useState<ActivityUser | null>(null);
  const [limitValues, setLimitValues] = useState<Record<ListingType, string>>({
    premium: '',
    'quick sell': '',
    standard: '',
  });
  const actionInFlightRef = useRef(new Set<string>());
  const requestSequenceRef = useRef(0);
  const debouncedSearch = useDebounce(search.trim(), 400);

  useEffect(() => {
    const controller = new AbortController();
    const sequence = ++requestSequenceRef.current;

    const params = new URLSearchParams({
      page: String(page),
      limit: '10',
    });
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (role) params.set('role', role);
    if (status) params.set('status', status);

    const fetchActivity = async () => {
      setLoading(true);
      try {
        const response: any = await getRequest({
          endpoint: `/users/activity?${params.toString()}`,
          signal: controller.signal,
        });
        if (sequence !== requestSequenceRef.current) return;
        setData(response?.data?.data || EMPTY_RESPONSE);
      } catch (error: any) {
        if (controller.signal.aborted) return;
        showToast({
          type: 'error',
          message: error?.message || 'Failed to fetch user activity',
        });
      } finally {
        if (sequence === requestSequenceRef.current) setLoading(false);
      }
    };

    fetchActivity();

    return () => controller.abort();
  }, [debouncedSearch, page, refreshKey, role, status]);

  const confirmAction = async () => {
    if (!pendingAction) return;
    const {user, action} = pendingAction;
    if (actionInFlightRef.current.has(user._id)) return;
    if (action === 'block' && !blockReason.trim()) {
      showToast({type: 'error', message: 'Block reason is required'});

      return;
    }

    actionInFlightRef.current.add(user._id);
    setUpdatingId(user._id);
    try {
      await patchRequest({
        endpoint: `/users/activity/${user._id}`,
        payload: {
          action,
          ...(action === 'block' ? {blockReason: blockReason.trim()} : {}),
        },
      });
      showToast({
        type: 'success',
        message:
          action === 'demote'
            ? 'Dealer demoted successfully'
            : `User ${action === 'block' ? 'blocked' : 'unblocked'} successfully`,
      });
      setPendingAction(null);
      setBlockReason('');
      setRefreshKey((value) => value + 1);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.message || 'Failed to update user',
      });
    } finally {
      actionInFlightRef.current.delete(user._id);
      setUpdatingId(null);
    }
  };

  const openLimitEditor = (user: ActivityUser) => {
    setLimitValues({
      premium: String(user.vehicleUsage.premium.limit),
      'quick sell': String(user.vehicleUsage['quick sell'].limit),
      standard: String(user.vehicleUsage.standard.limit),
    });
    setLimitUser(user);
  };

  const saveListingLimits = async (restoreDefaults = false) => {
    if (!limitUser || actionInFlightRef.current.has(limitUser._id)) return;

    const limits = restoreDefaults
      ? {premium: null, 'quick sell': null, standard: null}
      : Object.fromEntries(
          LISTING_TYPES.map(({key}) => [key, Number(limitValues[key])])
        );

    if (
      !restoreDefaults &&
      Object.values(limits).some(
        (value) => typeof value !== 'number' || !Number.isInteger(value)
      )
    ) {
      showToast({type: 'error', message: 'Limits must be whole numbers'});
      return;
    }

    actionInFlightRef.current.add(limitUser._id);
    setUpdatingId(limitUser._id);
    try {
      await patchRequest({
        endpoint: `/users/activity/${limitUser._id}/listing-limits`,
        payload: {limits},
      });
      showToast({
        type: 'success',
        message: restoreDefaults
          ? 'Role defaults restored'
          : 'Listing limits updated successfully',
      });
      setLimitUser(null);
      setRefreshKey((value) => value + 1);
    } catch (error: any) {
      showToast({
        type: 'error',
        message: error?.message || 'Failed to update listing limits',
      });
    } finally {
      actionInFlightRef.current.delete(limitUser._id);
      setUpdatingId(null);
    }
  };

  const summaryCards = useMemo(
    () => [
      {label: 'Total Accounts', value: data.summary.total, icon: Users},
      {label: 'Users', value: data.summary.users, icon: UserRound},
      {label: 'Dealers', value: data.summary.dealers, icon: Store},
      {label: 'Blocked Users', value: data.summary.blocked, icon: Ban},
    ],
    [data.summary]
  );

  const renderActions = (user: ActivityUser) => (
    <div className='flex flex-wrap justify-end gap-2'>
      <button
        type='button'
        disabled={updatingId === user._id}
        onClick={() => openLimitEditor(user)}
        className='inline-flex items-center gap-1 rounded-md bg-[#414279] px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50'
      >
        <Settings2 size={13} />
        Limits
      </button>
      {user.systemRole === 'user' && (
        <button
          type='button'
          disabled={updatingId === user._id}
          onClick={() => {
            setBlockReason('');
            setPendingAction({
              user,
              action: user.isBlocked ? 'unblock' : 'block',
            });
          }}
          className={`rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${
            user.isBlocked ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          {user.isBlocked ? 'Unblock' : 'Block'}
        </button>
      )}
      {user.systemRole === 'dealer' && (
        <button
          type='button'
          disabled={updatingId === user._id}
          onClick={() => setPendingAction({user, action: 'demote'})}
          className='rounded-md bg-amber-600 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          Demote to User
        </button>
      )}
    </div>
  );

  return (
    <div className='mx-auto max-w-[1500px] space-y-5'>
      <div className='rounded-2xl bg-gradient-to-r from-[#414279] to-[#6264a7] px-5 py-5 text-white shadow-sm sm:px-6 lg:flex lg:items-center lg:justify-between'>
        <div>
          <h1 className='text-xl font-semibold sm:text-2xl'>User Activity</h1>
          <p className='mt-1 text-sm text-white/75'>
            Track accounts, restrictions, and monthly vehicle upload allowances
            {data.period ? ` for ${data.period}` : ''}.
          </p>
        </div>
        <div className='mt-4 rounded-xl border border-white/15 bg-white/10 px-4 py-3 lg:mt-0 lg:text-right'>
          <p className='text-xs uppercase tracking-wider text-white/65'>
            Matching accounts
          </p>
          <p className='text-2xl font-semibold'>{data.pagination.total}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 xl:grid-cols-4'>
        {summaryCards.map(({label, value, icon: Icon}) => (
          <div
            key={label}
            className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'
          >
            <div className='flex items-center gap-3'>
              <div className='rounded-xl bg-[#414279]/10 p-2.5 text-[#414279]'>
                <Icon className='h-4 w-4 sm:h-5 sm:w-5' />
              </div>
              <div>
                <p className='text-xs font-medium text-gray-500 sm:text-sm'>
                  {label}
                </p>
                <p className='text-2xl font-semibold text-gray-900'>{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='grid gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:grid-cols-2 sm:p-4 lg:grid-cols-[minmax(260px,1fr)_180px_180px]'>
        <label className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder='Search name, email, phone...'
            className='w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#414279]'
          />
        </label>
        <select
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
            setPage(1);
          }}
          className='rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#414279]'
        >
          <option value=''>All roles</option>
          <option value='user'>Users</option>
          <option value='dealer'>Dealers</option>
        </select>
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className='rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#414279]'
        >
          <option value=''>All statuses</option>
          <option value='active'>Active</option>
          <option value='blocked'>Blocked</option>
        </select>
      </div>

      <div className='space-y-3 xl:hidden'>
        {!loading &&
          data.users.map((user) => (
            <article
              key={user._id}
              className='rounded-xl border border-gray-200 bg-white p-4'
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='truncate font-semibold text-gray-900'>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className='truncate text-sm text-gray-500'>{user.email}</p>
                </div>
                <span className='rounded-full bg-[#414279]/10 px-2.5 py-1 text-xs font-medium capitalize text-[#414279]'>
                  {user.systemRole}
                </span>
              </div>
              <div className='mt-4 grid gap-3'>
                {LISTING_TYPES.map(({key, label}) => (
                  <div key={key}>
                    <p className='mb-1 text-xs text-gray-500'>{label}</p>
                    <UsageCell usage={user.vehicleUsage[key]} />
                  </div>
                ))}
              </div>
              <div className='mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-3'>
                <div>
                  <p className='text-xs text-gray-500'>Last activity</p>
                  <p className='text-xs font-medium text-gray-700'>
                    {formatDate(user.lastActivityAt)}
                  </p>
                </div>
                {renderActions(user)}
              </div>
            </article>
          ))}
      </div>

      <div className='hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:block'>
        <table className='w-full table-fixed text-sm'>
          <thead className='bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500'>
            <tr>
              <th className='w-[25%] px-5 py-3.5'>Account</th>
              <th className='w-[15%] px-4 py-3.5'>Role / Status</th>
              <th className='w-[34%] px-4 py-3.5'>Monthly Uploads</th>
              <th className='w-[14%] px-4 py-3.5'>Last Activity</th>
              <th className='w-[12%] px-5 py-3.5 text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.users.map((user) => (
                <tr
                  key={user._id}
                  className='border-t border-gray-100 align-middle transition hover:bg-gray-50/70'
                >
                  <td className='px-5 py-4'>
                    <p className='truncate font-semibold text-gray-900'>
                      {user.firstName} {user.lastName}
                    </p>
                    <p className='truncate text-xs text-gray-500'>
                      {user.email}
                    </p>
                    <p className='mt-1 truncate text-xs text-gray-400'>
                      {user.city || user.phoneNumber || 'No location provided'}
                    </p>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex items-center gap-1.5 font-medium capitalize text-gray-800'>
                      {user.systemRole === 'dealer' ? (
                        <Store size={14} />
                      ) : (
                        <UserRound size={14} />
                      )}
                      {user.systemRole}
                    </div>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs ${
                        user.isBlocked
                          ? 'bg-red-50 text-red-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className='px-4 py-4'>
                    <div className='grid grid-cols-3 gap-3'>
                      {LISTING_TYPES.map(({key, label}) => (
                        <div
                          key={key}
                          className='rounded-lg border border-gray-100 bg-gray-50 p-2.5'
                        >
                          <p className='mb-1.5 text-[11px] font-semibold text-gray-500'>
                            {label}
                          </p>
                          <UsageCell usage={user.vehicleUsage[key]} compact />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className='px-4 py-4 text-xs text-gray-600'>
                    {formatDate(user.lastActivityAt)}
                  </td>
                  <td className='px-5 py-4'>{renderActions(user)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className='rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500'>
          Loading user activity...
        </div>
      )}
      {!loading && !data.users.length && (
        <div className='rounded-xl border border-gray-200 bg-white p-8 text-center'>
          <Activity className='mx-auto h-8 w-8 text-gray-300' />
          <p className='mt-2 text-sm text-gray-500'>
            No matching accounts found.
          </p>
        </div>
      )}

      {!loading && data.pagination.totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            paginationType={PAGINATION_TYPES.pageBased.value}
            handlePreviousPage={() =>
              setPage((value) => Math.max(value - 1, 1))
            }
            handleNextPage={() =>
              setPage((value) =>
                Math.min(value + 1, data.pagination.totalPages)
              )
            }
          />
        </div>
      )}

      {pendingAction && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
          <div className='w-full max-w-md rounded-xl bg-white p-5 shadow-xl'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-amber-50 p-2 text-amber-700'>
                {pendingAction.action === 'demote' ? (
                  <ShieldCheck size={20} />
                ) : (
                  <Car size={20} />
                )}
              </div>
              <div>
                <h2 className='font-semibold text-gray-900'>
                  Confirm account update
                </h2>
                <p className='text-sm text-gray-500'>
                  {pendingAction.user.firstName} {pendingAction.user.lastName}
                </p>
              </div>
            </div>
            <p className='mt-4 text-sm text-gray-700'>
              {pendingAction.action === 'demote'
                ? 'This dealer will become a regular user and receive user upload limits.'
                : pendingAction.action === 'block'
                  ? 'The bocked user will not be able to perform any action'
                  : 'This user will be allowed to perform actions again.'}
            </p>
            {pendingAction.action === 'block' && (
              <div className='mt-4'>
                <label
                  className='text-sm font-medium text-gray-800'
                  htmlFor='block-reason'
                >
                  Block reason
                </label>
                <textarea
                  id='block-reason'
                  value={blockReason}
                  maxLength={500}
                  disabled={Boolean(updatingId)}
                  onChange={(event) => setBlockReason(event.target.value)}
                  placeholder='Explain why this account is being blocked'
                  className='mt-1 h-24 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-[#414279] disabled:bg-gray-100'
                />
                <p className='mt-1 text-right text-xs text-gray-400'>
                  {blockReason.length}/500
                </p>
              </div>
            )}
            <div className='mt-5 flex justify-end gap-2'>
              <button
                type='button'
                disabled={Boolean(updatingId)}
                onClick={() => {
                  setPendingAction(null);
                  setBlockReason('');
                }}
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                type='button'
                disabled={Boolean(updatingId)}
                onClick={confirmAction}
                className='rounded-lg bg-[#414279] px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
              >
                {updatingId ? 'Updating...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {limitUser && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
          <div className='w-full max-w-md rounded-xl bg-white p-5 shadow-xl'>
            <div className='flex items-center gap-3'>
              <div className='rounded-full bg-[#414279]/10 p-2 text-[#414279]'>
                <Settings2 size={20} />
              </div>
              <div>
                <h2 className='font-semibold text-gray-900'>
                  Monthly listing limits
                </h2>
                <p className='text-sm text-gray-500'>
                  {limitUser.firstName} {limitUser.lastName}
                </p>
              </div>
            </div>
            <div className='mt-4 grid gap-3'>
              {LISTING_TYPES.map(({key, label}) => (
                <label key={key} className='text-sm font-medium text-gray-800'>
                  {label}
                  <input
                    type='number'
                    min={ROLE_DEFAULT_LIMITS[limitUser.systemRole][key]}
                    max={100}
                    step={1}
                    value={limitValues[key]}
                    disabled={Boolean(updatingId)}
                    onChange={(event) =>
                      setLimitValues((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#414279] disabled:bg-gray-100'
                  />
                </label>
              ))}
            </div>
            <p className='mt-3 text-xs text-gray-500'>
              Limits apply per UTC calendar month. Existing usage is not
              changed.
            </p>
            <div className='mt-5 flex flex-wrap justify-end gap-2'>
              <button
                type='button'
                disabled={Boolean(updatingId)}
                onClick={() => saveListingLimits(true)}
                className='mr-auto rounded-lg border border-amber-300 px-3 py-2 text-sm text-amber-700 disabled:opacity-50'
              >
                Restore defaults
              </button>
              <button
                type='button'
                disabled={Boolean(updatingId)}
                onClick={() => setLimitUser(null)}
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                type='button'
                disabled={Boolean(updatingId)}
                onClick={() => saveListingLimits()}
                className='rounded-lg bg-[#414279] px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
              >
                {updatingId ? 'Saving...' : 'Save limits'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
