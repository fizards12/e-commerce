import { defineStore } from 'pinia'
const initialState = {
  loading: false,
  toast: null,
  toastVisible: false,
}
export const useUIStore = defineStore('ui', {
  state: () => ({ ...initialState }),
  persist: true,
  actions: {
    setLoading(loading){
        this.loading = loading;
    },
    toggleLoading() {
        this.loading = !this.loading;
    },
    clearToast(){
        this.toast = null;
    },
    hideToast(){
      this.toastVisible = false  
    },
    showToast(toast){
        this.toastVisible = true
        this.toast = { message: toast?.message, type: toast?.type, duration: toast?.duration };
    },
  }
})
