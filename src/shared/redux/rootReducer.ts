import {combineReducers, Reducer} from 'redux';
import {persistReducer, PersistConfig} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import appReducer from './slices/app';
import userReducer from './slices/users';
import paymentReducer from './slices/payments';
import {clearStore} from '@/shared/redux/utils';
import {RootState} from './store';

interface NoopStorage {
  getItem: () => Promise<string | null>;
  setItem: (_key: string, value: string) => Promise<string>;
  removeItem: () => Promise<void>;
}

const createNoopStorage = (): NoopStorage => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const appPersistConfig: PersistConfig<any> = {
  key: 'app',
  storage,
  keyPrefix: 'redux-',
};

const userPersistConfig: PersistConfig<any> = {
  key: 'users',
  storage,
  keyPrefix: 'redux-',
};

const paymentPersistConfig: PersistConfig<any> = {
  key: 'payments',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['paymentDetails'],
};

const reduxAppReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  users: persistReducer(userPersistConfig, userReducer),
  payments: persistReducer(paymentPersistConfig, paymentReducer),
});

const rootReducer: Reducer<any> = (state, action) => {
  if (action.type === clearStore.type) {
    storage.removeItem('persist:root');
    storage.removeItem('persist:app');
    storage.removeItem('persist:users');
    storage.removeItem('persist:payments');
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    return reduxAppReducer(undefined, action);
  }

  return reduxAppReducer(state, action);
};

export {rootPersistConfig, rootReducer};

export type {RootState};
