import {useQueries as userQueries} from './users/queries';
import {useMutations as userMutations} from './users/mutations';
import {useQueries as checkbookQueries} from './checkbook/queries';
import {useQueries as productsQueries} from './products/queries';
import {useMutations as productsMutations} from './products/mutations';

export {
  userQueries,
  userMutations,
  checkbookQueries,
  productsQueries,
  productsMutations,
};
