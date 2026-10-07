<script setup>
import {computed, onMounted, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

const store = usePlotsStore();
const {plots, loading, error} = storeToRefs(store);
const search = ref('');
const filteredPlots = computed(() => {
  const query = search.value.trim().toLowerCase();
  return plots.value.filter(plot => `${plot.name} ${plot.location}`.toLowerCase().includes(query));
});
onMounted(() => store.fetchPlots());
</script>

<template>
  <section class="plots-page" :aria-busy="loading">
    <div class="page-heading">
      <h1>Registered Agricultural Plots</h1>
      <router-link class="action-link" to="/plots/new">Add plot</router-link>
    </div>
    <label for="plot-search">Search by name or location</label>
    <pv-input-text id="plot-search" v-model="search" class="w-full" type="search" />
    <p v-if="loading" role="status">Loading plots…</p>
    <div v-else-if="error" role="alert" class="error-message">
      <p>{{ error }}</p>
      <pv-button label="Try again" @click="store.fetchPlots()" />
    </div>
    <template v-else>
      <p>Total: {{ filteredPlots.length }}</p>
      <p v-if="!plots.length" class="empty-state">No plots registered yet. Add your first plot to get started.</p>
      <p v-else-if="!filteredPlots.length" class="empty-state">No plots match your search.</p>
      <div v-else class="plot-grid">
        <article v-for="plot in filteredPlots" :key="plot.id" class="plot-card">
          <h2>{{ plot.name }}</h2>
          <p>Location: {{ plot.location }}</p>
          <p>Surface: {{ plot.areaHectares }} ha</p>
          <p>Status: {{ plot.status === 'ACTIVE' ? 'Active' : 'Inactive' }}</p>
          <router-link :to="`/plots/${plot.id}`" :aria-label="`View details for ${plot.name}`">Details</router-link>
        </article>
      </div>
    </template>
  </section>
</template>
