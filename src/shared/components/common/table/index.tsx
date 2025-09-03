import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {CustomTableProps, HeaderItem} from '@/shared/interfaces/common';
import {Skeleton} from '@/shared/components/ui/skeleton';
import TablePlaceholder from './TablePlaceholder';

const CustomTable = ({
  headerData,
  bodyData,
  showSkeleton,
  paginationComponent,
  filtersComponent,
}: CustomTableProps) => {
  const getColumnClasses = ({index}: {index: number}) => {
    const isActionsColumn = index === headerData.length - 1;

    return isActionsColumn ? 'sticky right-0 bg-white z-30' : 'bg-white';
  };

  const isBodyDataEmpty = Array.isArray(bodyData) && bodyData.length === 0;

  return (
    <div className='w-full'>
      {filtersComponent}

      {isBodyDataEmpty && !showSkeleton ? (
        <div className='flex-1 flex items-center justify-center'>
          <TablePlaceholder />
        </div>
      ) : (
        <>
          <div className='overflow-x-auto'>
            <Table className='relative'>
              <TableHeader>
                <TableRow>
                  {headerData.map((item: HeaderItem, index: number) => (
                    <TableHead
                      key={item.value}
                      className={getColumnClasses({index})}
                    >
                      {item.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {showSkeleton ? (
                  <TableRow>
                    {headerData.map((item, index) => (
                      <TableCell
                        key={item.value}
                        className={getColumnClasses({index})}
                      >
                        <Skeleton className='h-8 w-full max-w-[150px] rounded-md' />
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  bodyData
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex justify-end pt-5'>{paginationComponent}</div>
        </>
      )}
    </div>
  );
};

export default CustomTable;
