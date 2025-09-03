import {useState} from 'react';
import {useModal} from './useModal';
import {FormModal} from '@/shared/components/common/modals';
import {
  PaymentClaimModalProps,
  PaymentMethod,
} from '@/shared/interfaces/checkbook';
import PaymentClaimWidget from '@/shared/components/pages/seller/checkbook/paymentClaim/PaymentClaimWidget';

export const usePaymentClaimModal = ({
  setPaymentCompletedLoading,
}: {
  setPaymentCompletedLoading: (loading: boolean) => void;
}) => {
  const [modalProps, setModalProps] = useState<PaymentClaimModalProps | null>(
    null
  );

  const [activePaymentMethod, setActivePaymentMethod] =
    useState<PaymentMethod | null>(null);

  const {
    closeModal: rawCloseModal,
    isModalOpen,
    openModal: rawOpenModal,
    setIsModalOpen,
    toggleModal,
  } = useModal();

  const openModal = ({
    props,
    paymentMethod,
  }: {
    props: PaymentClaimModalProps;
    paymentMethod: PaymentMethod;
  }) => {
    setModalProps(props);
    setActivePaymentMethod(paymentMethod);
    rawOpenModal();
  };

  const closeModal = () => {
    setModalProps(null);
    setActivePaymentMethod(null);
    rawCloseModal();
  };

  const PaymentClaimModalComponent = isModalOpen &&
    modalProps &&
    activePaymentMethod && (
      <FormModal
        content={[
          <PaymentClaimWidget
            key='payment-claim-widget'
            token={modalProps.token || ''}
            paymentMethod={activePaymentMethod}
            paymentMethods={modalProps.paymentMethods}
            closeModal={closeModal}
            setPaymentCompletedLoading={setPaymentCompletedLoading}
          />,
        ]}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={activePaymentMethod.name}
        isModalCloseWhenClickedOutside={true}
      />
    );

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    setIsModalOpen,
    PaymentClaimModalComponent,
    activePaymentMethod,
  };
};
