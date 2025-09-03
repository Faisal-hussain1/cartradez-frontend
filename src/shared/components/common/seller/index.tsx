import {DisplayIdProps} from '@/shared/interfaces/common';
import {getFormattedId} from '@/shared/utils/general';

export const DisplayId = ({id}: DisplayIdProps) => {
  const formattedId = getFormattedId({id});

  return <span>{formattedId}</span>;
};
