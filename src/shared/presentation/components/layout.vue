<script setup>
    const items = [
        {label: 'Home', to: '/home'},
        {label: 'Profile', to: '/profiles'},
        {label: 'My Plots', to: '/plots'},
        {label: 'My Drones', to: '/drones'},
        {label: 'Diagnoses', to: '/diagnoses'},
        {label: 'Reports', to: '/reports'},
        {label: 'Settings', to: '/settings'}
    ];
</script>

<template>
    <div class="layout-container">
        <header class="header">
            <pv-toolbar class="bg-emerald">
                <template #start>
                    <h3 class="title-skycrop">Skycrop</h3>
                </template>
            </pv-toolbar>
        </header>
        <div class="layout-body">
            <aside class="side-bar bg-emerald">
                <div class="flex-normal">
                    <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
                        <router-link :to="item.to" :class="slotProps['class']">
                            {{ item.label }}
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