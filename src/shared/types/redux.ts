export type Organization = {
  permissions: string;
  organizationId: string;
  role: string;
  isActive: boolean;
  _id: string;
  id: string;
};

export type User = {
  _id: string;
  name?: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  email: string;
  isVerified: boolean;
  organizations: Organization[];
  currentActiveOrganization: Organization;
  isSellerOnboarded: boolean;
  onboardingLink?: string;
  paymentEmailTemplate?: {
    subject: string;
    description: string;
  };
};

export type UsersState = {
  currentUser: User | null;
  list: User[];
};

export type AppState = {
  language: string;
};

export type PaymentDetails = {
  paymentIntentId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhoneNo?: string;
};

export type PaymentDetailsState = {
  paymentDetails: PaymentDetails | null;
};

export type CustomerData = {
  customerName: string;
  customerEmail: string;
  customerPhoneNo: string;
};
