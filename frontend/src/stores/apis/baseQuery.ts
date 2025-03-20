import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { call } from '../../services/call';

const customBaseQuery: <T>()=>BaseQueryFn<
  {
    fetcher: (...args: unknown[]) => Promise<T>;
    params?: unknown[];
    loading?: boolean;
  },
  T
> = ()=> async({ fetcher, params = [], loading = true }) => {
  try {
    const data = await call(fetcher, params, loading);
    return { data };
  } catch (error) {
    return { error };
  }
};

export default customBaseQuery;
