import {useParams} from 'next/navigation';
import {NEW_ITEM_SLUG} from '@/shared/constants/general';

export const useSingleEntityPageType = () => {
  const params = useParams();
  const isNewEntity = params.id === NEW_ITEM_SLUG;

  return {isNew: isNewEntity, id: params.id};
};
