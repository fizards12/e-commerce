import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
type Path = string;
type Title = string;
export const routesNames : {[key: Path] : Title} = {
    '/dashboard': 'Dashboard',
    '/dashboard/user': 'User',
    '/dashboard/categories': 'Categories',
    '/dashboard/products': 'Products List',
    '/dashboard/orders': 'Orders',
    '/dashboard/settings': 'Settings',
    '/dashboard/categories/new': 'Create Category',
    '/dashboard/products/new': 'Create Product',
    '/dashboard/orders/new': 'Create Order',  
}
interface AppState {
    loading: boolean;
    toast: {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
        duration?: number;
    } | null;
    toastVisible?: boolean;
}

const initialState: AppState = {
    loading: false,
    toast: null,
    toastVisible: false,
};

export const showToastThunk = createAsyncThunk(
    'app/showToastThunk',
    (payload: typeof initialState.toast, { dispatch }) => {
        dispatch(showToast(payload));
        setTimeout(() => {
            dispatch(hideToast());
            setTimeout(() => {
                dispatch(clearToast());
            },300)
        },payload?.duration)
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        toggleLoading: (state) => {
            state.loading = !state.loading;
        },
        clearToast: (state) => {
            state.toast = null;
        },
        hideToast: (state) => {
          state.toastVisible = false  
        },
        showToast: (state, action: PayloadAction<typeof initialState.toast>) => {
            state.toastVisible = true
            state.toast = { message: action.payload?.message, type: action.payload?.type, duration: action.payload?.duration };
        },
    },
});

export const { setLoading, toggleLoading, showToast, hideToast, clearToast } = appSlice.actions;
export default appSlice.reducer;
