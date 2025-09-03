'use client';

import {Provider} from 'react-redux';
import {store} from '@/shared/redux/store';
import {NodeChildrenProps} from '@/shared/interfaces/common';

const ReduxProvider = ({children}: NodeChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
