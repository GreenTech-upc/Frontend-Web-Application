<script setup>
    import {ref} from 'vue';
    import {useRoute} from 'vue-router';
    import {watch} from 'vue';
    import {useI18n} from 'vue-i18n';
    import LanguageSwitcher from './language-switcher.vue';
    const {t} = useI18n();
    const route = useRoute();
    const menuOpen = ref(false);
    watch(() => route.fullPath, () => { menuOpen.value = false; });
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
            <pv-toolbar class="app-toolbar">
                <template #start>
                    <button class="menu-toggle" type="button" :aria-label="t('navigation.toggleMenu')" :aria-expanded="menuOpen" aria-controls="main-navigation" @click="menuOpen = !menuOpen">
                        <i class="pi pi-bars" aria-hidden="true"></i>
                    </button>
                    <router-link class="title-skycrop" to="/plots">SkyCrop</router-link>
                </template>
                <template #end>
                    <language-switcher />
                </template>
            </pv-toolbar>
        </header>
        <div class="layout-body">
            <aside id="main-navigation" class="side-bar" :class="{'menu-open': menuOpen}">
                <nav :aria-label="t('navigation.menu')" class="navigation-list">
                    <template v-for="item in items" :key="item.label">
                        <router-link v-if="item.to === '/plots'" :to="item.to" class="navigation-item">
                            {{ t(item.label) }}
                        </router-link>
                        <span v-else class="navigation-item navigation-pending" aria-disabled="true" :title="t('navigation.pending')">
                            {{ t(item.label) }}
                        </span>
                    </template>
                </nav>
            </aside>
            <main class="layout-content">
                <router-view/>
            </main>
        </div>
    </div>    
</template>