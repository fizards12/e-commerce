import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
/* Global Components */
import AutoComplete from "../../../components/atoms/AutoComplete/AutoComplete.vue";
import Field from "../../../components/atoms/Field/Field.vue";
import Table from "../../../components/atoms/Table/Table.vue";
import NavbarLink from "../../../components/atoms/NavbarLink.vue";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router).use(pinia).mount('#app-dashboard')
/* Global Components Registerations */
app.component("AutoComplete", AutoComplete);
app.component("Field", Field);
app.component("CustomTable", Table);
app.component("NavbarLink", NavbarLink);