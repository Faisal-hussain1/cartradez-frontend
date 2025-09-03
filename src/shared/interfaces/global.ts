import {CheckbookDeposit} from './checkbook';

declare global {
  interface Window {
    checkbook?: {
      deposit: CheckbookDeposit;
    };
  }
}
