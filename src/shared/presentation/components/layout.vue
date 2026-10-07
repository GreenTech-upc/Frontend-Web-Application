<script setup>
    import {useI18n} from 'vue-i18n';
    import LanguageSwitcher from './language-switcher.vue';
    const {t} = useI18n();
    const items = [
        {label: 'navigation.home', to: '/home'},
        {label: 'navigation.profile', to: '/profiles'},
        {label: 'navigation.plots', to: '/plots'},
        {label: 'navigation.drones', to: '/drones'},
        {label: 'navigation.diagnoses', to: '/diagnoses'},
        {label: 'navigation.reports', to: '/reports'},
        {label: 'navigation.settings', to: '/settings'}
    ];
</script>

<template>
    <div class="layout-container">
        <header class="header">
            <pv-toolbar class="bg-emerald">
                <template #start>
                    <h3 class="title-skycrop">Skycrop</h3>
                </template>
                <template #end>
                    <language-switcher />
                </template>
            </pv-toolbar>
        </header>
        <div class="layout-body">
            <aside class="side-bar bg-emerald">
                <div class="flex-normal">
                    <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
                        <router-link :to="item.to" :class="slotProps['class']">
                            {{ t(item.label) }}
                        </router-link>
                    </pv-button>
                </div>
            </aside>
            <main class="layout-content">
                <router-view/>
            </main>
        </div>
    </div>    
</template>