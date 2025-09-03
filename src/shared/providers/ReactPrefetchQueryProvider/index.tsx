import {prefetchQueries} from '@/shared/hooks/reactQuery/prefetchQueries';
import {ReactPrefetchQueryProviderProps} from '@/shared/interfaces/common';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

export default async function ReactPrefetchQueryProvider({
  queriesToFetch,
  children,
}: ReactPrefetchQueryProviderProps) {
  if (queriesToFetch && queriesToFetch.length === 0) return children;

  const queryClient = await prefetchQueries({queriesToFetch});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
