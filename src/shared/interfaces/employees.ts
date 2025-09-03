export type Employee = {
  _id: string;
  name: string;
  email: string;
  businessIds: string[];
  organizations: any;
};

export type EmployeeRowProps = {
  employee: Employee;
  onDeleteEmployee: () => void;
  onUpdateEmployee: () => void;
};

export interface DeleteEmployeeConfirmationHookProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  toBeClosedByParent?: boolean;
}

export interface EmployeeBusinessOptionsProps {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface AddEmployeeProps {
  closeFormModal: () => void;
  employee: Employee | null;
}

export interface getAllowedBusinessIdsOfEmployeesProps {
  employee: Employee | null;
}
