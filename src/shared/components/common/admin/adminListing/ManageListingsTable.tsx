'use client';

import Image from 'next/image';
import {Eye, Trash2, Pencil, X, AlertTriangle,
  Image as ImageIcon,} from 'lucide-react';
import {
  useFetchAllVehicleList,
} from '@/shared/reactQuery/vehicles/queries';
import GlobalLoader from '../../loaders/GlobalLoader';
import {useEffect, useMemo, useState} from 'react';
import {formatDate} from 'date-fns';
import {useSelector} from 'react-redux';
import {getCurrentUser, getUserRole} from '@/shared/redux/slices/users';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {USER_ROUTES} from '@/shared/constants/PATHS';
import { useMutations } from '@/shared/reactQuery/vehicles/mutations';
import { vehiclesQueries } from '@/shared/reactQuery';
import VehiclePngModal from './VehiclePngModal';
import { VEHICLE_FUEL_TYPES, VEHICLE_MAKES } from '@/shared/constants/vehicles';
import {showToast} from '@/shared/utils/toasts';
import Pagination from '@/shared/components/common/pagination';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Vehicle {
  _id: string;
  id?: string;
  slug?: string;
  make: string;
  model: string;
  year?: number;
  price: number;
  currency: string;
  listingType: string | null;
  coverImage: {key: string; url: string};
  images?: Array<{key: string; url: string}>;
  creatorId: string;
  isManagedByCartradez?: boolean;
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
  const normalizeCurrencyValue = (currency?: string) =>
    String(currency || 'usd').toLowerCase();
  const toTitleCase = (value: string) =>
    value
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  const makeOptions = Object.values(VEHICLE_MAKES).map((make: any) => {
    const value = String(make?.value || make || '').toLowerCase();
    return {value, label: toTitleCase(value)};
  });
  const fuelTypeOptions = Object.values(VEHICLE_FUEL_TYPES).map((fuel: any) => {
    const value = String(fuel?.value || fuel || '').toLowerCase();
    return {value, label: toTitleCase(value)};
  });

   const {useFetchVehicleById} = vehiclesQueries();
   
  const {
    data,refetch: refetchVehicleDetail
  } = useFetchVehicleById({
    params: {vehicleId:vehicle._id},
  });
  const vehicleDetail = data?.vehicle;
  const [replacementFilesByKey, setReplacementFilesByKey] = useState<Record<string, File>>({});
  const [replacementPreviewByKey, setReplacementPreviewByKey] = useState<Record<string, string>>({});
  const [removedImageKeys, setRemovedImageKeys] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    variant: '',
    registrationCity: '',
    registrationYear: '',
    registrationNumber: '',
    numberOfOwners: '',
    condition: '',
    mileage: 0,
    features: [] as string[],
    description: '',
    bodyType: '',
    fuelType: '',
    transmission: '',
    color: '',
    engineSize: 0,
    driveType: '',
    price: '',
    currency: 'usd',
    listingType: '',
  });

  useEffect(() => {
    if (!vehicleDetail) return;
    setForm({
      make: String(vehicleDetail?.make || '').toLowerCase(),
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
      fuelType: String(vehicleDetail?.fuelType || '').toLowerCase(),
      transmission: vehicleDetail?.transmission || '',
      color: vehicleDetail?.color || '',
      engineSize: vehicleDetail?.engineSize || 0,
      driveType: vehicleDetail?.driveType || '',
      price: vehicleDetail?.price || '',
      currency: normalizeCurrencyValue(vehicleDetail?.currency),
      listingType: vehicleDetail?.listingType || '',
    });
  }, [vehicleDetail]);

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

    if (name === 'features') {
      setForm((prev) => ({
        ...prev,
        features: value
          .split(',')
          .map((feature) => feature.trim())
          .filter(Boolean),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSingleImageReplace = (
    imageKey: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReplacementFilesByKey((prev) => ({
      ...prev,
      [imageKey]: file,
    }));
    setReplacementPreviewByKey((prev) => ({
      ...prev,
      [imageKey]: URL.createObjectURL(file),
    }));
  };

  const handleRemoveExistingImage = (imageKey: string) => {
    setRemovedImageKeys((prev) => (prev.includes(imageKey) ? prev : [...prev, imageKey]));
    setReplacementFilesByKey((prev) => {
      const next = {...prev};
      delete next[imageKey];
      return next;
    });
    setReplacementPreviewByKey((prev) => {
      const next = {...prev};
      delete next[imageKey];
      return next;
    });
  };

  const handleAddNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentCount = (vehicleDetail?.images || []).length - removedImageKeys.length + newImages.length;
    if (currentCount + files.length > 9) {
      showToast({type: 'error', message: 'Total images cannot exceed 9.'});
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== index));
    setNewImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const finalCount =
    (vehicleDetail?.images || []).length - removedImageKeys.length + newImages.length;
  if (finalCount > 9) {
    showToast({type: 'error', message: 'Total images cannot exceed 9.'});
    return;
  }
  if (finalCount < 1) {
    showToast({type: 'error', message: 'At least one vehicle image is required.'});
    return;
  }

  const payload = new FormData();
  const textPayload = {
    make: form.make,
    model: form.model,
    year: Number(form.year),
    price: Number(form.price),
    currency: form.currency,
    listingType: form.listingType,
    fuelType: form.fuelType,
    transmission: form.transmission,
    bodyType: form.bodyType,
    condition: form.condition,
    mileage: Number(form.mileage),
    color: form.color,
    engineSize: Number(form.engineSize),
    driveType: form.driveType,
    variant: form.variant,
    registrationCity: form.registrationCity,
    registrationYear: form.registrationYear,
    registrationNumber: form.registrationNumber,
    numberOfOwners: form.numberOfOwners,
    features: form.features,
    description: form.description,
  };

  Object.entries(textPayload).forEach(([key, value]) => {
    if (key === 'features') return;
    if (value !== undefined && value !== null) {
      payload.append(key, String(value));
    }
  });
  form.features.forEach((feature) => payload.append('features[]', feature));
  Object.entries(replacementFilesByKey).forEach(([imageKey, file]) => {
    payload.append('replaceImageKeys[]', imageKey);
    payload.append('files', file);
  });
  removedImageKeys.forEach((imageKey) => {
    payload.append('removedImageKeys[]', imageKey);
  });
  newImages.forEach((file) => {
    payload.append('files', file);
  });

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
          <div>
            <label className='text-sm font-medium'>Vehicle Images ({(vehicleDetail?.images || []).length - removedImageKeys.length + newImages.length}/9)</label>
            <div className='mt-3 grid grid-cols-2 md:grid-cols-3 gap-3'>
              {(vehicleDetail?.images || []).map((image) => {
                if (removedImageKeys.includes(image.key)) return null;
                const preview = replacementPreviewByKey[image.key] || image.url;
                return (
                  <div key={image.key} className='rounded-lg border border-border p-2 space-y-2 relative'>
                    <button
                      type='button'
                      onClick={() => handleRemoveExistingImage(image.key)}
                      className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs'
                    >
                      <X size={12} />
                    </button>
                    <div className='relative w-full h-28 rounded-md overflow-hidden'>
                      <Image
                        src={preview}
                        alt='Vehicle image'
                        fill
                        className='object-cover'
                        sizes='220px'
                      />
                    </div>
                    <label className='block text-center text-xs px-2 py-1 rounded border border-border cursor-pointer hover:bg-muted'>
                      Replace Image
                      <input
                        type='file'
                        accept='image/*'
                        hidden
                        onChange={(e) => handleSingleImageReplace(image.key, e)}
                      />
                    </label>
                  </div>
                );
              })}
              {newImagePreviews.map((preview, idx) => (
                <div key={`${preview}-${idx}`} className='rounded-lg border border-border p-2 space-y-2 relative'>
                  <button
                    type='button'
                    onClick={() => handleRemoveNewImage(idx)}
                    className='absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs'
                  >
                    <X size={12} />
                  </button>
                  <div className='relative w-full h-28 rounded-md overflow-hidden'>
                    <Image
                      src={preview}
                      alt='New vehicle image'
                      fill
                      className='object-cover'
                      sizes='220px'
                    />
                  </div>
                  <p className='text-xs text-muted-foreground text-center'>New image</p>
                </div>
              ))}
            </div>
            <div className='mt-3'>
              <label className='inline-block text-center text-xs px-3 py-2 rounded border border-border cursor-pointer hover:bg-muted'>
                Add New Images
                <input
                  type='file'
                  accept='image/*'
                  hidden
                  multiple
                  onChange={handleAddNewImages}
                />
              </label>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium'>Make</label>
              <select
                name='make'
                value={form.make}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
                required
              >
                <option value=''>Select make</option>
                {makeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                name='engineSize'
                value={form.engineSize}
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
              <select
                name='fuelType'
                value={form.fuelType}
                onChange={handleChange}
                className='mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm'
              >
                <option value=''>Select fuel type</option>
                {fuelTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
                <option value='zmw'>ZMW</option>
                <option value='usd'>USD</option>
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
              Are you sure you want to delete{' '}
              <span className='font-medium text-foreground'>
                {vehicle.make} {vehicle.model}?
              </span>{' '}
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
        min-w-[820px]
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
onClick={() => onView(item.slug || item._id)}  />

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
export default function ManageListingsTable({
  managedOnly = false,
}: {
  managedOnly?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useSelector(getCurrentUser);
  const role = useSelector(getUserRole);
  const canViewAllListings = role === 'admin';
  const pageNoFromUrl = Number(searchParams.get('page') || '1');
  const pageNo = Number.isNaN(pageNoFromUrl) || pageNoFromUrl < 1 ? 1 : pageNoFromUrl;
  const pageLimit = 10;
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [vehicleToPng, setVehicleToPng] = useState<Vehicle | null>(null);

  const listingTypeFilter = searchParams.get('listingType') || '';
  const startDateFilter = searchParams.get('startDate') || '';
  const endDateFilter = searchParams.get('endDate') || '';
  const shouldFetchListings = canViewAllListings || Boolean(user?._id);
  const fetchParams = {
    pageNo,
    pageLimit,
    ...(managedOnly
      ? {isManagedByCartradez: true}
      : {
          activeOnly: true,
          isManagedByCartradez: false,
          ...(listingTypeFilter ? {listingType: listingTypeFilter} : {}),
        }),
    ...(startDateFilter ? {startDate: startDateFilter} : {}),
    ...(endDateFilter ? {endDate: endDateFilter} : {}),
    ...(!canViewAllListings && user?._id ? {creatorId: user._id} : {}),
  };

  const {data, isLoading,refetch} = useFetchAllVehicleList({
    params: fetchParams,
  });

  const vehicles: Vehicle[] = useMemo(() => {
    const rawVehicles: Vehicle[] = data?.data?.vehicles ?? data?.vehicles ?? [];
    if (canViewAllListings) return rawVehicles;
    if (!user?._id) return [];
    // Safety net: enforce owner-only records client-side for non-admin users.
    return rawVehicles.filter((vehicle) => vehicle.creatorId === user._id);
  }, [canViewAllListings, data?.data?.vehicles, data?.vehicles, user?._id]);
  const paginationData = data?.pagination;
  const totalActiveListings = paginationData?.count ?? 0;
  const totalPages = paginationData?.totalPages ?? 1;

  const listings = useMemo(() => {
    if (managedOnly) return vehicles;
    return vehicles.filter(
      (v) => v.listingType !== null && v.isManagedByCartradez !== true,
    );
  }, [managedOnly, vehicles]);


  const handleView = (vehicleId: string) => {
    router.push(USER_ROUTES.vehicleDetails(vehicleId), {scroll: true});
  };

 const handleEdit = (vehicleId: string) => {
  
  const selectedVehicle = listings.find((item) => item._id === vehicleId);

  if (selectedVehicle) {
    setVehicleToEdit(selectedVehicle);
  }
};

  const updatePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nextPage));
    router.replace(`${pathname}?${params.toString()}`, {scroll: false});
  };

  if (!shouldFetchListings) {
    return <GlobalLoader height='h-[200px]' />;
  }

  if (isLoading) return <GlobalLoader height='h-[200px]' />;

  if (!user?._id) {
    return (
      <section className='bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm'>
        Loading user information...
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
        <div className='px-4 py-3 border-b border-border text-sm font-medium text-foreground'>
          {managedOnly
            ? 'Managed by Cartradez Listings'
            : canViewAllListings
              ? 'Total Active Listings'
              : 'My Listings'}
          :{' '}
          {totalActiveListings.toLocaleString()}
        </div>
        <div className='md:hidden p-3 space-y-3'>
          {listings.length ? (
            listings.map((item) => (
              <MobileVehicleCard
                key={item._id}
                item={item}
                onView={handleView}
                onEdit={handleEdit}
                onPng={setVehicleToPng}
                onDeleteRequest={setVehicleToDelete}
              />
            ))
          ) : (
            <div className='p-6 text-center text-muted-foreground text-sm border border-border rounded-lg'>
              {managedOnly
                ? 'No managed-by-Cartradez listings found.'
                : 'You have no active listings yet.'}
            </div>
          )}
        </div>

        <div className='hidden md:block overflow-x-auto'>
          {/* Header */}
          <div
            className='
            grid grid-cols-[40px_1.5fr_120px_140px_160px_140px]
            min-w-[820px]
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
          {listings.length ? (
            listings.map((item, index) => (
              <VehicleRow
                key={item._id}
                item={item}
                index={(pageNo - 1) * pageLimit + index}
                onView={handleView}
                onEdit={handleEdit}
                onPng={setVehicleToPng}
                onDeleteRequest={setVehicleToDelete}
              />
            ))
          ) : (
            <div className='p-10 text-center text-muted-foreground text-sm border-t border-border min-w-[820px]'>
              {managedOnly
                ? 'No managed-by-Cartradez listings found.'
                : 'You have no active listings yet.'}
            </div>
          )}
        </div>
        {listings.length > 0 && (
          <div className='px-4 flex justify-end border-t border-border'>
            <Pagination
              currentPage={pageNo}
              totalPages={totalPages}
              handlePreviousPage={() => updatePage(Math.max(1, pageNo - 1))}
              handleNextPage={() =>
                updatePage(Math.min(totalPages, pageNo + 1))
              }
            />
          </div>
        )}
      </section>
    </>
  );
}

function MobileVehicleCard({
  item,
  onView,
  onEdit,
  onPng,
  onDeleteRequest,
}: {
  item: Vehicle;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onPng: (vehicle: Vehicle) => void;
  onDeleteRequest: (vehicle: Vehicle) => void;
}) {
  return (
    <div className='rounded-lg border border-border p-3 space-y-3'>
      <div className='flex items-start gap-3'>
        {item?.coverImage?.url ? (
          <Image
            src={item.coverImage.url}
            alt={item.coverImage.key}
            width={56}
            height={56}
            className='h-14 w-14 rounded-md object-cover flex-shrink-0'
          />
        ) : (
          <div className='h-14 w-14 rounded-md bg-muted flex-shrink-0' />
        )}
        <div className='min-w-0'>
          <p className='font-medium truncate'>
            {item.make} {item.model} {item.year && `(${item.year})`}
          </p>
          <p className='text-xs text-muted-foreground capitalize mt-1'>
            {item?.listingType ?? '-'}
          </p>
          <p className='text-sm font-medium mt-1'>
            {item?.currency?.toUpperCase() === 'USD' ? '$' : 'ZMW'}{' '}
            {item?.price?.toLocaleString()}
          </p>
          <p className='text-xs text-muted-foreground mt-1'>
            {item?.createdAt
              ? formatDate(new Date(item.createdAt), 'LLL dd, yyyy')
              : '-'}
          </p>
        </div>
      </div>

      <div className='flex flex-wrap gap-2'>
        <ActionButton
          type='view'
          icon={<Eye size={14} />}
          label='View'
onClick={() => onView(item.slug || item._id)}        />
        <ActionButton
          type='edit'
          icon={<Pencil size={14} />}
          label='Edit'
          onClick={() => onEdit(item._id)}
        />
        <ActionButton
          type='png'
          icon={<ImageIcon size={14} />}
          label='PNG'
          onClick={() => onPng(item)}
        />
        <ActionButton
          type='delete'
          icon={<Trash2 size={14} />}
          label='Delete'
          onClick={() => onDeleteRequest(item)}
        />
      </div>
    </div>
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
