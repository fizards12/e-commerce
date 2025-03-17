import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { call } from '../../services/call';

const customBaseQuery: BaseQueryFn<
  {
    fetcher: (...args: unknown[]) => Promise<unknown>;
    params?: unknown[];
    loading?: boolean;
  }
> = async<T>({ fetcher, params = [], loading = true }) => {
  try {
    const data = await call(fetcher, params, loading);
    return { data };
  } catch (error) {
    return { error };
  }
};

export default customBaseQuery;
