import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import router from './router.js'
import { Button, Column, ConfirmDialog, DataTable, FloatLabel, InputText, Select, SelectButton, Textarea, Toolbar } from 'primevue'

createApp(App)
    .use(router)
    .component('pv-button',         Button)
    .component('pv-column',         Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-data-table',     DataTable)
    .component('pv-float-label',    FloatLabel)
    .component('pv-input-text',     InputText)
    .component('pv-select',         Select)
    .component('pv-select-button',  SelectButton)
    .component('pv-textarea',       Textarea)
    .component('pv-toolbar',        Toolbar)
    .mount('#app')