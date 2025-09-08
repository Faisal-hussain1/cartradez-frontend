import {CopyLinkParams} from '@/shared/types/utils';
import {asyncTryCatch} from './tryCatchUtils';

export const copyToClipboard = async ({link}: CopyLinkParams) => {
  const {success, error} = await asyncTryCatch(
    async () => await navigator.clipboard.writeText(link)
  );

  return {success, error};
};
