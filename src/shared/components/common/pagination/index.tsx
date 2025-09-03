import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {PaginationComponentProps} from '@/shared/interfaces/hooks';
import {ChevronLeftIcon, ChevronRightIcon} from '../../icons';
import {PAGINATION_TYPES} from '@/shared/constants/general';

const Pagination = ({
  handleNextPage,
  handlePreviousPage,
  currentPage,
  totalPages = 0,
  paginationType = PAGINATION_TYPES.pageBased.value,
  hasNextPage = true,
}: PaginationComponentProps) => {
  const isPageBased = paginationType === PAGINATION_TYPES.pageBased.value;
  const isLastPage = isPageBased ? currentPage >= totalPages : !hasNextPage;

  return (
    <div className='flex items-center gap-3 py-4'>
      <PrimaryButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        buttonText={<ChevronLeftIcon />}
      />
      <span className='mx-[10px]'>
        Page {currentPage}
        {isPageBased && ` of ${totalPages}`}
      </span>
      <PrimaryButton
        onClick={handleNextPage}
        disabled={isLastPage}
        buttonText={<ChevronRightIcon />}
      />
    </div>
  );
};

export default Pagination;
