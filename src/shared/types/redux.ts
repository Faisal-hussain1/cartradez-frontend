export type Organization = {
  permissions: string;
  organizationId: string;
  role: string;
  isActive: boolean;
  _id: string;
  id: string;
};

export type CheckbookAccount = {
  id: string;
  userId: string;
};

export type CheckbookWallet = {
  id: string;
  account: string;
  balance: number;
  name: string;
  creationDate: number;
  routing: string;
  numbers: {
    ach: {
      account: string;
      routing: string;
    };
    rtp: {
      account: string;
      routing: string;
    };
    wire: {
      account: string;
      routing: string;
    };
  };
};

export type Features = {
  stripe: {
    enabled: boolean;
    onboarding: {
      status: boolean;
    };
    account: {
      id: string;
    };
  };
  checkbook: {
    enabled: boolean;
    onboarding: {
      status: boolean;
    };
    account: CheckbookAccount;
    wallets: CheckbookWallet[];
  };
};

export type User = {
  _id: string;
  name?: string;
  firstName: string;
  lastName: string;
  username: string;
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
  features: Features;
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
