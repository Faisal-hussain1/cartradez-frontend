'use client';
import {useState} from 'react';
import {DateRange} from 'react-day-picker';
import {Calendar} from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {Button} from '@/shared/components/ui/button';
import {ArrowDownIcon, CalendarIcon} from '@/shared/components/icons';
import {formatDate} from '@/shared/utils/dateUtils';
import useTranslation from '@/shared/hooks/useTranslation';
import {DateRangeSelectorProps} from '@/shared/interfaces/chart';

export default function DateRangeSelector({
  defaultRange,
  appliedRange,
  onApply,
}: DateRangeSelectorProps) {
  const {t} = useTranslation();
  const [selectedRange, setSelectedRange] = useState<DateRange>(appliedRange);

  const formatDisplayDate = (date: Date) =>
    formatDate({
      date: date.toISOString(),
      format: 'MMM dd, yyyy',
    });

  const handleApply = () => onApply(selectedRange);

  const handleReset = () => {
    setSelectedRange(defaultRange);
    onApply(defaultRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-full md:w-auto justify-start md:justify-between gap-2 bg-mist text-secondary'
        >
          <CalendarIcon className='h-4 w-4' />
          <span>
            {appliedRange.from &&
              appliedRange.to &&
              `${formatDisplayDate(appliedRange.from)} - ${formatDisplayDate(appliedRange.to)}`}
          </span>
          <ArrowDownIcon className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 border-none shadow-none'
        align='end'
      >
        <div className='p-4 space-y-2'>
          <Calendar
            autoFocus
            mode='range'
            selected={selectedRange}
            onSelect={(range) => range && setSelectedRange(range)}
            numberOfMonths={1}
            disabled={{after: new Date()}}
            captionLayout='dropdown'
          />
          <div className='flex gap-2 pt-2'>
            <Button className='w-full' onClick={handleApply}>
              {t('commonContent.apply')}
            </Button>
            <Button
              variant='outline'
              className='w-full border border-gray-300'
              onClick={handleReset}
            >
              {t('commonContent.reset')}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
