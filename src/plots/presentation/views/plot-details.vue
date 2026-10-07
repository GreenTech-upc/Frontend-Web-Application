<script setup>
import {useI18n} from 'vue-i18n';
import {watch} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

const {t, n, locale} = useI18n();
const route = useRoute();
const store = usePlotsStore();
const {selectedPlot: plot, loading, error, notFound} = storeToRefs(store);
watch(() => route.params.id, id => store.fetchPlot(id), {immediate: true});

function formatDate(value) {
  if (!value || Number.isNaN(Date.parse(value))) return t('plots.notAvailable');
  return new Intl.DateTimeFormat(locale.value === 'es' ? 'es-PE' : 'en', {dateStyle: 'medium'}).format(new Date(value));
}
</script>

<template>
  <section class="plots-page" :aria-busy="loading">
    <router-link to="/plots">{{ t('plots.back') }}</router-link>
    <p v-if="loading" role="status">{{ t('plots.loadingDetails') }}</p>
    <div v-else-if="error" class="error-message" role="alert">
      <p>{{ t(error) }}</p>
      <pv-button :label="t('plots.retry')" @click="store.fetchPlot(route.params.id)" />
    </div>
    <div v-else-if="notFound" class="empty-state">
      <h1>{{ t('plots.notFound') }}</h1>
      <p>{{ t('plots.notFoundDescription') }}</p>
    </div>
    <template v-else-if="plot">
      <p v-if="route.query.registered === 'true'" class="success-message" role="status">{{ t('plots.registered') }}</p>
      <h1>{{ plot.name }}</h1>
      <div class="plot-card">
        <h2>{{ t('plots.detailsTitle') }}</h2>
        <dl class="plot-details">
          <dt>{{ t('plots.location') }}</dt><dd>{{ plot.location }}</dd>
          <dt>{{ t('plots.surface') }}</dt><dd>{{ n(plot.areaHectares) }} ha</dd>
          <dt>{{ t('plots.status') }}</dt><dd>{{ t(plot.status === 'ACTIVE' ? 'plots.active' : 'plots.inactive') }}</dd>
          <dt>{{ t('plots.registeredOn') }}</dt><dd>{{ formatDate(plot.createdAt) }}</dd>
        </dl>
      </div>
    </template>
  </section>
</template>
