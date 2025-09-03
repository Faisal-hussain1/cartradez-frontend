import {DateTime} from 'luxon';
import {
  DateWithTimeFromTimestampType,
  DateWithTimeType,
} from '@/shared/types/utils';
import {CST_TIMEZONE} from '@/shared/constants/general';

// Function to get the current date and time
function getCurrentDateTime(): string {
  return DateTime.now().toISO();
}

// Function to format a date to a specific format
function formatDate({
  date,
  format = 'yyyy-MM-dd',
}: {
  date: string;
  format?: string;
}): string {
  return DateTime.fromISO(date).toFormat(format);
}
function isValidDate({date}: {date: string}): boolean {
  return DateTime.fromISO(date).isValid;
}

function getFullYear(): number {
  return DateTime.now().year;
}

function getTimeStamps() {
  return DateTime.now().toMillis();
}

function getFormattedDateWithTimeInCST({date, time}: DateWithTimeType): string {
  const combined = `${date} ${time}`;

  const dateTime = DateTime.fromFormat(combined, 'dd-MM-yyyy hh:mm a', {
    zone: 'utc',
  });

  const formatted = dateTime
    .setZone(CST_TIMEZONE)
    .toFormat('MM/dd/yy - hh:mma');

  return `${formatted} (CST)`;
}

function formatTimeStampsToCST({timestamp}: {timestamp: number}): string {
  return DateTime.fromSeconds(timestamp, {zone: CST_TIMEZONE}).toFormat(
    'MMMM d'
  );
}

function differenceBetweenDates({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const from = DateTime.fromISO(startDate, {zone: CST_TIMEZONE});
  const to = DateTime.fromISO(endDate, {zone: CST_TIMEZONE});

  return to.diff(from, 'days').days + 1; // +1 to include the start date
  // e.g., if startDate is 2023-10-01 and endDate is 2023-10-02, the difference is 2 days
  // (2023-10-01 and 2023-10-02 are both included).
}

function convertISOToJSDate({isoDate}: {isoDate: string}): Date {
  return DateTime.fromISO(isoDate).toJSDate();
}

function getDefaultWeekRange() {
  const now = DateTime.now().setZone(CST_TIMEZONE);
  const oneWeekAgo = now.minus({days: 6});

  return {
    nowIso: now.toISODate(), // 'YYYY-MM-DD'
    oneWeekAgoIso: oneWeekAgo.toISODate(), // 'YYYY-MM-DD'
  };
}

function formatDayMonthShort({date}: {date: string}): string {
  return DateTime.fromFormat(date, 'dd-MM-yyyy').toFormat('dd LLL');
}

function getFormattedCSTDateTimeFromTimestamp({
  timestamp,
  zone = CST_TIMEZONE,
}: DateWithTimeFromTimestampType) {
  const formatted = DateTime.fromSeconds(timestamp, {zone}).toFormat(
    'MM/dd/yy - hh:mma'
  );

  return `${formatted} (CST)`;
}

export {
  getCurrentDateTime,
  formatDate,
  isValidDate,
  getFullYear,
  getTimeStamps,
  getFormattedDateWithTimeInCST,
  formatTimeStampsToCST,
  differenceBetweenDates,
  convertISOToJSDate,
  getDefaultWeekRange,
  formatDayMonthShort,
  getFormattedCSTDateTimeFromTimestamp,
};
