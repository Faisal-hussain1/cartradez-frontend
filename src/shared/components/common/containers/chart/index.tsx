import {Line} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import {ChartContainerProps} from '@/shared/interfaces/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function ChartContainer({
  title,
  dateRangeSelector,
  data,
  options,
  selectInput,
}: ChartContainerProps) {
  return (
    <div className='bg-white rounded-[10px] shadow-glow p-2 sm:p-6 mb-6'>
      <div className='flex flex-col md:flex-row sm:justify-between sm:items-start md:items-center mb-6'>
        <h3 className='text-xl leading-7 text-gray90 font-semibold mb-4 md:mb-0'>
          {title}
        </h3>
        <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
          {selectInput}
          {dateRangeSelector}
        </div>
      </div>
      <div className='relative h-[400px]'>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
