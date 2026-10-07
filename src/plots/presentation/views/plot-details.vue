<script setup>
import {watch} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

const route = useRoute();
const store = usePlotsStore();
const {selectedPlot: plot, loading, error, notFound} = storeToRefs(store);
watch(() => route.params.id, id => store.fetchPlot(id), {immediate: true});

function formatDate(value) {
  if (!value || Number.isNaN(Date.parse(value))) return 'Not available';
  return new Intl.DateTimeFormat('en', {dateStyle: 'medium'}).format(new Date(value));
}
</script>

<template>
  <section class="plots-page" :aria-busy="loading">
    <router-link to="/plots">My plots</router-link>
    <p v-if="loading" role="status">Loading plot details…</p>
    <div v-else-if="error" class="error-message" role="alert">
      <p>{{ error }}</p>
      <pv-button label="Try again" @click="store.fetchPlot(route.params.id)" />
    </div>
    <div v-else-if="notFound" class="empty-state">
      <h1>Plot not found</h1>
      <p>This plot does not exist.</p>
    </div>
    <template v-else-if="plot">
      <p v-if="route.query.registered === 'true'" class="success-message" role="status">Plot registered successfully.</p>
      <h1>{{ plot.name }}</h1>
      <div class="plot-card">
        <h2>Plot details</h2>
        <dl class="plot-details">
          <dt>Location</dt><dd>{{ plot.location }}</dd>
          <dt>Surface</dt><dd>{{ plot.areaHectares }} ha</dd>
          <dt>Status</dt><dd>{{ plot.status === 'ACTIVE' ? 'Active' : 'Inactive' }}</dd>
          <dt>Registered on</dt><dd>{{ formatDate(plot.createdAt) }}</dd>
        </dl>
      </div>
    </template>
  </section>
</template>
