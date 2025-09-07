import {
  Dispatch,
  FormEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';
import {ColorResult} from 'react-color';
import {IconBaseProps} from 'react-icons';
import {Crop} from 'react-image-crop';
import {Seller} from './dashboard';
import {LogoVariation} from '@/shared/types/common';
import {ButtonProps} from './dialogs';

export interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{locale: string}>;
}

export interface GlobalErrorProps {
  error: Error;
  statusCode?: number;
}

export interface NodeChildrenProps {
  children: ReactNode;
}

export interface NodeChildrenWithStyleProps {
  children: ReactNode;
  className?: string;
}

export interface FullWidthContainerProps {
  children: ReactNode;
  className?: string;
}

export interface AuthFormContainerProps {
  children: ReactNode;
  handleSubmit?: FormEventHandler<HTMLFormElement>;
  heading: string;
  formStyles?: string;
  subHeading?: string;
}

export interface ToasterComponentProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export interface IconProps extends IconBaseProps {
  size?: string | number;
  color?: string;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ReactPrefetchQueryProviderProps {
  queriesToFetch?: any[]; // Replace 'any[]' with a specific type if possible
  children: ReactNode;
}

export interface AppContextType {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface LogoProps {
  width?: number;
  height?: number;
  variation?: LogoVariation;
  styles?: string;
}

export interface HeadingProps {
  title: string;
  buttonText: string;
  handleClick: () => void;
}

export interface StepperProps {
  steps: {label: string}[];
  currentStep: number;
  seller?: Seller;
  buttonTextColor: string;
  themeColor: string;
}

export interface ImageCropperProps {
  crop: Crop;
  handleCrop: (crop: Crop) => void;
  imageHeight: number;
  imageWidth: number;
  imagePreview: string;
  imageRef: RefObject<HTMLImageElement | null>;
}

export interface ColorPickerProps {
  value: string;
  onColorPick: (value: ColorResult) => void;
}

export interface MessageProps {
  imgSrc: string;
  title: string;
  description?: string;
  descriptionStyle?: string;
  containerStyle?: string;
}

export interface SellerCardProps {
  seller: Seller;
}

export interface TableHeadingProps {
  title: string;
}

export interface HeaderItem {
  label: string;
  value: string;
}

export interface CustomTableProps {
  headerData: HeaderItem[];
  bodyData: ReactNode;
  showSkeleton?: boolean;
  paginationComponent?: ReactNode;
  filtersComponent?: ReactNode;
}

export interface DisplayIdProps {
  id: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface GeneralBackdropProps {
  title: string;
  content?: ReactNode[];
  buttons?: ButtonProps[];
}

export interface truncateWordsProps {
  text: string;
  limit?: number;
}

export interface BannerProps {
  heading: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  condition: string;
  location: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  status: string;
  isFeatured: boolean;
  images: [{key: string; url: string}];
  badge: string;
}
