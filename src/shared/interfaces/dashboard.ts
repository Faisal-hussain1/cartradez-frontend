import {ReactNode} from 'react';
import {Crop} from 'react-image-crop';
import {SidebarRoute} from './utils';

export interface UsersPageProps {
  params: Promise<{id: string}>;
}

export interface ListItemProps {
  route: SidebarRoute;
}

export interface ProfileImageUploadProps {
  setIsCropModalOpen: (isCropModalOpen: boolean) => void;
  setImagePreview: (url: string) => void;
  setCrop: (value: Crop) => void;
  imagePreview: string;
  setIsProfileImageRemoved: (value: boolean) => void;
  setFile: (file: File) => void;
}

export interface ChooseColorFieldProps {
  setIsThemeModalOpen: (value: boolean) => void;
  value: string;
  placeholder: string;
}

export interface CardFieldProps {
  name: string;
  value: string | ReactNode;
  alignment?: string;
  isValueOnNewLine?: boolean;
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
