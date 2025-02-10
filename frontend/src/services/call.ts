// Import the error handler
import store from '../stores';
import { toggleLoading } from '../stores/app/app';
import { handleError } from './error';

// Define a general call function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function call<T>(fetcher: (...args: any[]) => Promise<T>, params: any[],loading: boolean = true): Promise<T> {
    try {
        if (loading) {
            store.dispatch(toggleLoading());
        }
        // Call the fetcher function with the provided parameters
        const response = await fetcher(...params);
        return response;
    } catch (error) {
        // Handle any errors using the error handler
        throw handleError(error);
    }finally{
        if (loading) {
            store.dispatch(toggleLoading());
        }
    }
}
