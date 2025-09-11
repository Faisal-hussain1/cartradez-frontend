import {BuildDynamicUrlParamsType} from '@/shared/types/utils';

export const buildDynamicURL = (
  baseEndpoint: string,
  params: BuildDynamicUrlParamsType
): string => {
  const {
    search = '',
    sort = '',
    pageNo = 0,
    pageLimit,
    pageToken = '',
    startDate = '',
    endDate = '',
    status = '',
    id = '',
    nextPageStartAfter = '',
  } = params || {};
  const queryParams = new URLSearchParams();

  if (search) queryParams.append('search', search);
  if (sort) queryParams.append('sort', sort);
  if (pageNo > 0) queryParams.append('page', pageNo.toString());
  if (pageLimit) queryParams.append('limit', pageLimit.toString());
  if (pageToken) queryParams.append('pageToken', pageToken);
  if (startDate) queryParams.append('startDate', startDate);
  if (endDate) queryParams.append('endDate', endDate);
  if (status) queryParams.append('status', status);
  if (id) queryParams.append('id', id);
  if (nextPageStartAfter)
    queryParams.append('startingAfter', nextPageStartAfter);

  const queryString = queryParams.toString();

  return queryString ? `${baseEndpoint}?${queryString}` : baseEndpoint;
};
