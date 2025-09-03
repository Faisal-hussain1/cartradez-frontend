import {ControllerRenderProps, FieldError, FieldValues} from 'react-hook-form';
import {Options} from 'react-select';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  control: any;
  name: string;
  disabled?: boolean;
  onFocus?: () => void;
}

export interface RichTextInputProps {
  label?: string;
  control: any;
  name: string;
  disabled?: boolean;
  toolbarOptions?: any[]; // Toolbar options for the rich text editor,
  imagesAllowed?: boolean; // Disable image upload if true
  onFocus?: () => void;
}

export interface CounterInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
}

export interface NumberInputProps {
  label?: string;
  placeholder?: string;
  control: any;
  name: string;
  minValue?: number;
}

export interface SelectInputProps {
  label?: string;
  options: Options<{value: any; label: string}>;
  control: any;
  name: string;
  placeholder?: string;
  [key: string]: any; // Allow other props to be passed to react-select
}

export interface ErrorMessageProps {
  errorMsg?: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface SortConfig {
  options: Record<string, SortOption>;
  directions: Record<string, string>;
}

export interface SortSelectsProps {
  sortValue: any;
  sortConfig?: SortConfig;
  setSortField: (field: string) => void;
  setDirection: (direction: string) => void;
}

export interface CounterFieldProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, any>;
  error?: FieldError;
  name: string;
  label?: string;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
}

export interface RadioOption {
  label: string;
  value: boolean;
}

export interface RadioGroupProps {
  control: any;
  name: string;
  label?: string;
  options: RadioOption[];
  disabled?: boolean;
}

export interface SearchInputProps {
  initialValue?: string;
  onSearch: (searchValue: string) => void;
  placeholder?: string;
  additionalInputClassName?: string;
  additionalButtonClassName?: string;
}
