import {PAYOUT_STATUSES} from '../constants/balances';

export interface BalancesOverviewCardProps {
  title: string;
  amount?: number;
  icon: string;
  showAmountSkelton?: boolean;
}

export interface ShowBalanceOverviewCardWithSkeltonProps {
  showTotalBalancesSkelton?: boolean;
  showInTransitBalancesSkelton?: boolean;
  totalBalancesData?: {
    totalBalance: number;
    totalInTransitBalance: number;
    upcomingBalance: number;
  };
}

export type PayoutStatus = keyof typeof PAYOUT_STATUSES;

export type Payout = {
  amount: number;
  status: PayoutStatus;
  destination: string;
  arriveBy: number;
  id: string;
};

export type PayoutRowProps = {
  payout: Payout;
};

export interface ShowPayoutTableWithSkeltonProps {
  showTableSkelton?: boolean;
  payoutsData?: Payout[];
  paginationComponent?: React.ReactNode;
}
