import {FormModal} from '@/shared/components/common/modals';
import useTranslation from '../useTranslation';
import {useModal} from './useModal';
import AddEmployee from '@/shared/components/pages/seller/employee/AddEmployee';
import {useState} from 'react';
import {Employee} from '@/shared/interfaces/employees';

export const useAddUpdateEmployeeModal = () => {
  const {t} = useTranslation();

  const {closeModal, isModalOpen, openModal, setIsModalOpen, toggleModal} =
    useModal();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const openModalWithEmployee = (employee?: Employee) => {
    setSelectedEmployee(employee || null);
    openModal();
  };

  const AddAndUpdateModalComponent = isModalOpen && (
    <FormModal
      content={[
        <AddEmployee
          key='add-seller-form'
          closeFormModal={closeModal}
          employee={selectedEmployee}
        />,
      ]}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      title={
        selectedEmployee?._id
          ? t('employees.updateEmployee')
          : t('employees.addEmployee')
      }
    />
  );

  return {
    openModalWithEmployee,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    AddAndUpdateModalComponent,
  };
};
