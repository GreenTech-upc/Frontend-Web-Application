import {createApp} from 'vue'
import './style.css'
import App from './app.vue'

import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import {
    Button,
    Card,
    DatePicker,
    Select
} from 'primevue'

const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Material
        },
        ripple: true,
        license: primeUiLicenseKey
    })
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-date-picker', DatePicker)
    .component('pv-select', Select)
    .mount('#app')