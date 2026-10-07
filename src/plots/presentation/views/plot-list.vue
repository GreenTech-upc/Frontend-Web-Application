<script setup>
import {useI18n} from 'vue-i18n';
import {computed, onMounted, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

const {t, n} = useI18n();
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
      <h1>{{ t('plots.listTitle') }}</h1>
      <router-link class="action-link" to="/plots/new">{{ t('plots.add') }}</router-link>
    </div>
    <label for="plot-search">{{ t('plots.search') }}</label>
    <pv-input-text id="plot-search" v-model="search" class="w-full" type="search" />
    <p v-if="loading" role="status">{{ t('plots.loading') }}</p>
    <div v-else-if="error" role="alert" class="error-message">
      <p>{{ t(error) }}</p>
      <pv-button :label="t('plots.retry')" @click="store.fetchPlots()" />
    </div>
    <template v-else>
      <p>{{ t('plots.total', {count: filteredPlots.length}) }}</p>
      <p v-if="!plots.length" class="empty-state">{{ t('plots.empty') }}</p>
      <p v-else-if="!filteredPlots.length" class="empty-state">{{ t('plots.noMatches') }}</p>
      <div v-else class="plot-grid">
        <article v-for="plot in filteredPlots" :key="plot.id" class="plot-card">
          <h2>{{ plot.name }}</h2>
          <p>{{ t('plots.location') }}: {{ plot.location }}</p>
          <p>{{ t('plots.surface') }}: {{ n(plot.areaHectares) }} ha</p>
          <p>{{ t('plots.status') }}: {{ t(plot.status === 'ACTIVE' ? 'plots.active' : 'plots.inactive') }}</p>
          <router-link :to="`/plots/${plot.id}`" :aria-label="t('plots.detailsLink', {name: plot.name})">{{ t('plots.details') }}</router-link>
        </article>
      </div>
    </template>
  </section>
</template>
