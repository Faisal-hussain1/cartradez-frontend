'use client';

import Image from 'next/image';
import {Eye, Trash2, Pencil, X, AlertTriangle,
  Image as ImageIcon,} from 'lucide-react';
import {
  useFetchAllVehicleList,
  useDeleteVehicle,
  useFetchVehicleById,
} from '@/shared/reactQuery/vehicles/queries';
import GlobalLoader from '../../loaders/GlobalLoader';
import {useMemo, useState} from 'react';
import {formatDate} from 'date-fns';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {useRouter} from 'next/navigation';
import {USER_ROUTES} from '@/shared/constants/PATHS';
import { useMutations } from '@/shared/reactQuery/vehicles/mutations';
import { vehiclesQueries } from '@/shared/reactQuery';
import VehiclePngModal from './VehiclePngModal';
import { number } from 'yup';
import { middleware } from '@/middleware';
import { features } from 'process';
import { VEHICLE_FUEL_TYPES, VEHICLE_MAKES } from '@/shared/constants/vehicles';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Vehicle {
  _id: string;
  id?: string;
  make: string;
  model: string;
  year?: number;
  price: number;
  currency: string;
  listingType: string | null;
  coverImage: {key: string; url: string};
  creatorId: string;
  createdAt?: string;
  title?: string;
}

function EditVehicleModal({
  vehicle,
  onClose,
  refetch,
}: {
  vehicle: Vehicle;
  onClose: () => void;
  refetch?: () => void | Promise<unknown>;
}) {
   const {useFetchVehicleById} = vehiclesQueries();


  const {
    data,refetch: refetchVehicleDetail
  } = useFetchVehicleById({
    params: {vehicleId:vehicle._id},
  });
  const vehicleDetail = data?.vehicle;
  
  const [form, setForm] = useState({
    make: vehicleDetail?.make || '',
    model: vehicleDetail?.model || '',
    year: vehicleDetail?.year || '',
    variant: vehicleDetail?.variant || '',
    registrationCity: vehicleDetail?.registrationCity || '',
    registrationYear: vehicleDetail?.registrationYear || '',
    registrationNumber: vehicleDetail?.registrationNumber || '',
    numberOfOwners: vehicleDetail?.numberOfOwners || '',
    condition: vehicleDetail?.condition || '',
    mileage: vehicleDetail?.mileage || 0,
    features: vehicleDetail?.features || [],
    description: vehicleDetail?.description || '',
    bodyType: vehicleDetail?.bodyType || '',
    fuelType: vehicleDetail?.fuelType || '',
    transmission: vehicleDetail?.transmission || '',
    color: vehicleDetail?.color || '',
    engineCapacity: vehicleDetail?.engineCapacity || 0,
    driveType: vehicleDetail?.driveType || '',
    price: vehicleDetail?.price || '',
    currency: vehicleDetail?.currency || 'ZMW',
    listingType: vehicleDetail?.listingType || '',
  });

  const {useUpdateVehicleMutation} = useMutations();

  const {mutate, isPending} = useUpdateVehicleMutation({
    vehicleId: vehicle._id,
    callBackFuncs: {
       onSuccessAlways: async () => {
      await refetch?.();
      await refetchVehicleDetail?.();
      onClose();
    },
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    make: form.make,
    model: form.model,
    year: Number(form.year),
    price: Number(form.price),
    currency: form.currency,
    listingType: form.listingType,
    fuelType: form.fuelType,
    transmission: form.transmission,
    color: form.color,
    engineCapacity: Number(form.engineCapacity),
    driveType: form.driveType,
    variant: form.variant,
    registrationYear: form.registrationYear,
    registrationNumber: form.registrationNumber,
    numberOfOwners: form.numberOfOwners,
    features: form.features,
    description: form.description,
  };

  mutate({
    payload,
  });
  
};

  return (
  <div className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto px-4 py-8'>
  <div className='bg-card border border-border rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6'>
    <div className='flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-card'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>
              Update Vehicle
            </h3>
            <p className='text-sm text-muted-foreground'>
              Edit listing details and save changes.
            </p>
          </div>

          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
           <div>
  <label className='text-sm font-medium'>Make</label>

  <input
    name='make'
    value={form.make}
    onChange={handleChange}
    list='vehicle-makes-list'
    placeholder='Select or type make'
    className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
    required
  />

  <datalist id='vehicle-makes-list'>
    {Object.values(VEHICLE_MAKES).map((make: any) => {
      const value =
        typeof make === 'object'
          ? make.value || make.label
          : make;

      return (
        <option key={value} value={value} />
      );
    })}
  </datalist>
</div>

            <div>
              <label className='text-sm font-medium'>Model</label>
              <input
                name='model'
                value={form.model}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                required
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Variant</label>
              <input
                name='variant'
                value={form.variant}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
              
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Condition</label>
              <input
                name='condition'
                value={form.condition}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Body Type</label>
              <input
                name='bodyType'
                value={form.bodyType}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Color</label>
              <input
                name='color'
                value={form.color}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Mileage</label>
              <input
                name='mileage'
                value={form.mileage}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
              
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Engine Capacity</label>
              <input
                name='engineCapacity'
                value={form.engineCapacity}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Transmission</label>
              <input
                name='transmission'
                value={form.transmission}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Drive Type</label>
              <input
                name='driveType'
                value={form.driveType}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
             <div>
  <label className='text-sm font-medium'>Fuel Type</label>

  <input
    name='fuelType'
    value={form.fuelType}
    onChange={handleChange}
    list='vehicle-fuel-types-list'
    placeholder='Select or type fuel type'
    className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
    
  />

  <datalist id='vehicle-fuel-types-list'>
    {Object.values(VEHICLE_FUEL_TYPES).map((fuelType: any) => {
      const value =
        typeof fuelType === 'object'
          ? fuelType.value || fuelType.label
          : fuelType;

      return <option key={value} value={value} />;
    })}
  </datalist>
</div>

            <div>
              <label className='text-sm font-medium'>Year</label>
              <input
                name='year'
                type='number'
                value={form.year}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
              
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Registration Year</label>
              <input
                name='registrationYear'
                type='number'
                value={form.registrationYear}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Registration Number</label>
              <input
                name='registrationNumber'
                type='text'
                value={form.registrationNumber}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Number of Owners</label>
              <input
                name='numberOfOwners'
                type='text'
                value={form.numberOfOwners}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Price</label>
              <input
                name='price'
                type='number'
                value={form.price}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                required
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Currency</label>
              <select
                name='currency'
                value={form.currency}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
              >
                <option value='ZMW'>ZMW</option>
                <option value='USD'>USD</option>
              </select>
            </div>

            <div>
               <label className='text-sm font-medium'>Listing Type</label>
              <input
                name='listingType'
                type='text'
                value={form.listingType}
                readOnly
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                required
              />
            </div>
            <div>
              <label className='text-sm font-medium'>Description</label>
              <input
                name='description'
                value={form.description}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                
              />
            </div>
             <div>
              <label className='text-sm font-medium'>Features</label>
              <input
                name='features'
                value={form.features.join(', ')}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'

              />
            </div>
          </div>

          <div className='pt-4 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isPending}
              className='px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted disabled:opacity-50'
            >
              Cancel
            </button>

            <button
              type='submit'
              disabled={isPending}
              className='px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground disabled:opacity-50'
            >
              {isPending ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Delete confirmation modal
// ---------------------------------------------------------------------------
function DeleteConfirmModal({
  vehicle,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  vehicle: Vehicle;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-card border border-border rounded-2xl shadow-xl w-full max-w-md mx-4 p-6'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'>
            <AlertTriangle
              size={20}
              className='text-red-600 dark:text-red-400'
            />
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-base font-semibold text-foreground'>
              Delete listing?
            </h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              This will permanently remove{' '}
              <span className='font-medium text-foreground'>
                {vehicle.make} {vehicle.model}
              </span>{' '}
              and all its images. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onCancel}
            className='flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className='px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className='px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2'
          >
            {isDeleting ? (
              <>
                <span className='h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin' />
                Deleting…
              </>
            ) : (
              'Delete listing'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Row — isolated so each row owns its delete hook with its own vehicleId.
//
// FIX (delete not working): useMutationHandler needs a static endpoint string
// baked in at hook-call time. We can't pass a factory function as `endpoint`.
// Lifting the hook into an individual Row component means vehicleId is always
// known when useDeleteVehicle is called, satisfying that constraint.
// ---------------------------------------------------------------------------
function VehicleRow({
  item,
  index,
  onView,
  onEdit,
  onPng,
  onDeleteRequest,
}: {
  item: Vehicle;
  index: number;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onPng: (vehicle: Vehicle) => void;
  onDeleteRequest: (vehicle: Vehicle) => void;
}) {
  return (
    <div
      className='
        grid grid-cols-[40px_1.5fr_120px_140px_160px_140px]
        px-4 py-3
        items-center
        text-sm
        border-t border-border
        hover:bg-muted/50
        transition
      '
    >
      <span className='text-muted-foreground'>{index + 1}</span>

      <div className='flex items-center gap-3 min-w-0'>
        {item?.coverImage?.url ? (
          <Image
            src={item.coverImage.url}
            alt={item.coverImage.key}
            width={36}
            height={36}
            className='rounded-md object-cover flex-shrink-0'
          />
        ) : (
          <div className='h-9 w-9 rounded-md bg-muted flex-shrink-0' />
        )}
        <span className='font-medium truncate'>
          {item.make} {item.model} {item.year && `(${item.year})`}
        </span>
      </div>

      <span className='capitalize text-muted-foreground'>
        {item?.listingType ?? '—'}
      </span>

      <span className='font-medium'>
        {item?.currency?.toUpperCase() === 'USD' ? '$' : 'ZMW'}{' '}
        {item?.price?.toLocaleString()}
      </span>

      <span className='text-muted-foreground'>
        {item?.createdAt
          ? formatDate(new Date(item.createdAt), 'LLL dd, yyyy')
          : '—'}
      </span>

     <div className='flex justify-end gap-2'>
  <ActionButton
    type='view'
    icon={<Eye size={14} />}
    label='View listing'
    onClick={() => onView(item._id)}
  />

  <ActionButton
    type='edit'
    icon={<Pencil size={14} />}
    label='Edit listing'
    onClick={() => onEdit(item._id)}
  />

  <ActionButton
    type='png'
    icon={<ImageIcon size={14} />}
    label='See PNG'
    onClick={() => onPng(item)}
    showText
  />

  <ActionButton
    type='delete'
    icon={<Trash2 size={14} />}
    label='Delete listing'
    onClick={() => onDeleteRequest(item)}
  />
</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeleteHandler — mounts only when a vehicle is selected for deletion.
// This gives useDeleteVehicle a stable, non-empty vehicleId every render.
// ---------------------------------------------------------------------------
function DeleteHandler({
  vehicle,
  onCancel,
  refetch,
}: {
  vehicle: Vehicle;
  onCancel: () => void;
  refetch?: () => void | Promise<unknown>;
}) {
  const {useDeleteVehicleMutation} = useMutations();

  const {mutate, isPending} = useDeleteVehicleMutation({
    vehicleId: vehicle._id,
    callBackFuncs: {
      onSuccessAlways: async () => {
        await refetch?.();
        onCancel();
      },
    },
  });

  return (
    <DeleteConfirmModal
      vehicle={vehicle}
      onConfirm={() => mutate()}
      onCancel={onCancel}
      isDeleting={isPending}
    />
  );
}

// ---------------------------------------------------------------------------
// Main table
// ---------------------------------------------------------------------------
export default function ManageListingsTable() {
  const router = useRouter();
  const user = useSelector(getCurrentUser);
 const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
const [vehicleToPng, setVehicleToPng] = useState<Vehicle | null>(null);

  const {data, isLoading,refetch} = useFetchAllVehicleList();

  const vehicles: Vehicle[] = data?.data?.vehicles ?? data?.vehicles ?? [];

  const listings = useMemo(() => {
    if (!user?._id) return [];
    return vehicles.filter(
      (v) => v.listingType !== null && v.creatorId === user._id,
    );
  }, [vehicles, user?._id]);


  const handleView = (vehicleId: string) => {
    router.push(USER_ROUTES.vehicleDetails(vehicleId), {scroll: true});
  };

 const handleEdit = (vehicleId: string) => {
  
  const selectedVehicle = listings.find((item) => item._id === vehicleId);

  if (selectedVehicle) {
    setVehicleToEdit(selectedVehicle);
  }
};

  if (isLoading) return <GlobalLoader height='h-[200px]' />;

  if (!user?._id) {
    return (
      <section className='bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm'>
        Loading user information...
      </section>
    );
  }

  if (!listings.length) {
    return (
      <section className='bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm'>
        You have no listings yet.
      </section>
    );
  }

  return (
    <>
      {/* FIX: DeleteHandler is a separate component so useDeleteVehicle always
          receives a real vehicleId — it only mounts when vehicleToDelete is set */}
      {vehicleToDelete && (
        <DeleteHandler
          vehicle={vehicleToDelete}
          onCancel={() => setVehicleToDelete(null)}
          refetch={refetch}
        />
      )}
        {vehicleToEdit && (
  <EditVehicleModal
    vehicle={vehicleToEdit}
    refetch={refetch}
    onClose={() => setVehicleToEdit(null)}
  />
)}
{vehicleToPng && (
  <VehiclePngModal
    vehicle={vehicleToPng}
    onClose={() => setVehicleToPng(null)}
  />
)}

      <section className='bg-card border border-border rounded-xl overflow-hidden'>
        {/* Header */}
        <div
          className='
            grid grid-cols-[40px_1.5fr_120px_140px_160px_140px]
            px-4 py-3
            text-xs font-semibold
            text-muted-foreground
            bg-muted
          '
        >
          <span>#</span>
          <span>Listing</span>
          <span>Listing Type</span>
          <span>Price</span>
          <span>Created</span>
          <span className='text-right'>Actions</span>
        </div>

        {listings.map((item, index) => (
         <VehicleRow
  key={item._id}
  item={item}
  index={index}
  onView={handleView}
  onEdit={handleEdit}
  onPng={setVehicleToPng}
  onDeleteRequest={setVehicleToDelete}
/>
        ))}
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Action button
// ---------------------------------------------------------------------------
const ACTION_STYLES = {
  view: `
    text-[color:var(--blue100)]
    border-[color:var(--blue100)]
    hover:bg-[color:var(--blue10)]
  `,
  edit: `
    text-[color:var(--yellow100,#ca8a04)]
    border-[color:var(--yellow100,#ca8a04)]
    hover:bg-[color:var(--yellow10,#fefce8)]
  `,
  delete: `
    text-[color:var(--red100)]
    border-[color:var(--red100)]
    hover:bg-[color:var(--error-light)]
  `,
  png: `
    text-[color:var(--green100)]
    border-[color:var(--green100)]
    hover:bg-[color:var(--green10)]
  `,
} as const;

function ActionButton({
  icon,
  type,
  label,
  onClick,
  disabled,
  showText = false,
}: {
  icon: React.ReactNode;
  type: keyof typeof ACTION_STYLES;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  showText?: boolean;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`
        h-8
        ${showText ? 'w-auto px-2 gap-1.5' : 'w-8'}
        flex items-center justify-center
        rounded-md
        border
        transition-colors
        disabled:opacity-40 disabled:cursor-not-allowed
        ${ACTION_STYLES[type]}
      `}
    >
      {icon}
      {showText && (
        <span className='text-[11px] font-semibold leading-none'>
          {label}
        </span>
      )}
    </button>
  );
}