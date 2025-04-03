import {
  type DefaultError,
  type QueryKey,
  type UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

export function useEnsuredQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const query = useQuery(options);
  return [query.data!, query] as const;
}
