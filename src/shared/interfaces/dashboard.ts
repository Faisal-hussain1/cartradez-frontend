import React, {ReactNode} from 'react';
import {Control, UseFormHandleSubmit, UseFormWatch} from 'react-hook-form';
import {Crop} from 'react-image-crop';
import {SidebarRoute} from './utils';
import {Features} from '../types/redux';

export interface UsersPageProps {
  params: Promise<{id: string}>;
}

export interface ListItemProps {
  route: SidebarRoute;
}

export interface AddSellerPayload {
  name: string;
  username: string;
  email: string;
  commissionRate: number;
  themeColor: string;
  isProfileImageRemoved?: boolean;
  enabledFeatures: {
    checkbook?: boolean;
  };
}

export interface AddEmployeePayload {
  name: string;
  email: string;
  businessIds: string[];
}

export interface ProfileImageUploadProps {
  setIsCropModalOpen: (isCropModalOpen: boolean) => void;
  setImagePreview: (url: string) => void;
  setCrop: (value: Crop) => void;
  imagePreview: string;
  setIsProfileImageRemoved: (value: boolean) => void;
  setFile: (file: File) => void;
}

export interface AddSellerFormProps {
  control: Control<AddSellerPayload>;
  handleSubmit: UseFormHandleSubmit<AddSellerPayload>;
  onSubmit: (data: AddSellerPayload) => void;
  setIsThemeModalOpen: (value: boolean) => void;
  watch: UseFormWatch<AddSellerPayload>;
  closeFormModal: () => void;
  isLoading: boolean;
  isEdit?: boolean;
}

export interface ChooseColorFieldProps {
  setIsThemeModalOpen: (value: boolean) => void;
  value: string;
  placeholder: string;
}

export interface AddSellerProps {
  closeFormModal: () => void;
  isEdit?: boolean;
  sellerData?: Seller;
}

export interface CardFieldProps {
  name: string;
  value: string | ReactNode;
  alignment?: string;
  isValueOnNewLine?: boolean;
}

export interface BasicBusinessFields {
  isActive: boolean;
  name: string;
  slug: string;
  _id: string;
}

export interface Seller {
  _id: string;
  name: string;
  username: string;
  email: string;
  commissionRate: number;
  themeColor: string;
  isSellerOnboarded: boolean;
  isVerified: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  onboardingLink: string;
  stripeAccountId: string;
  profileImage?: {
    url: string;
    key: string;
  } | null;
  permissions: Permission[];
  businesses?: BasicBusinessFields[];
  maxBusinesses?: number;
  features: Features;
}

export interface Permission {
  _id: string;
  organizations: OrganizationPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationPermission {
  organizationId: string;
  role: string;
  isActive: boolean;
  deletedAt: string | null;
}

export interface ThemeColorProps {
  color: string;
}

export interface SellerCardLinkProps {
  label?: string;
  link: string;
  onClick: () => void;
}

export interface SellerFooterItemProps {
  label: string;
  value?: string;
  color?: string;
}

export interface SellerCardActionsProps {
  Icon: React.ComponentType<any>;
  onClick: () => void;
  tooltip: string;
}

export interface SellerBusinessToggleProps {
  isActive: boolean;
  link: string;
  businessName: string;
  businessId: string;
}

export interface ModifySellerBusiness {
  maxBusinesses: number;
}
