import {DateRange} from 'react-day-picker';
import type {ChartData, ChartOptions, ChartType} from 'chart.js';

export interface ChartContainerProps<TChart extends ChartType = 'line'> {
  title: string;
  dateRangeSelector: React.ReactNode;
  data: ChartData<TChart>;
  options: ChartOptions<TChart>;
  selectInput: React.ReactNode;
}

export interface DateRangeSelectorProps {
  defaultRange: DateRange;
  appliedRange: DateRange;
  onApply: (range: DateRange) => void;
}

export interface DateRangeValidatorProps {
  range: DateRange;
  minDays?: number;
  maxDays?: number;
}
