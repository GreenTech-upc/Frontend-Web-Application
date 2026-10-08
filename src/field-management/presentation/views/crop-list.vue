
<script setup>
import {computed, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';

const route = useRoute();
const {t, n} = useI18n();
const store = usePlotsStore();
const {plots, loading, error} = storeToRefs(store);

const plot = computed(() =>
    plots.value.find(plot => String(plot.id) === String(route.params.id))
);

onMounted(() => store.fetchPlots());
</script>

<template>
  <section class="plots-page" :aria-busy="loading">
    <p class="mb-3">
      <router-link to="/plots">{{ t('navigation.plots') }}</router-link>
      / {{ plot?.name || route.params.id }} / Crops
    </p>

    <div class="page-heading">
      <h1>Registered Crops</h1>
      <p>Crops associated with this plot.</p>
    </div>

    <p v-if="loading">Loading plot...</p>
    <p v-else-if="error" class="error-message">{{ t(error) }}</p>
    <p v-else-if="!plot">Plot not found.</p>

    <template v-else>
      <div class="crop-list-header">
        <div class="crop-list-plot">
          <h2>{{ plot.name }}</h2>
          <p>{{ t('plots.surface') }}: {{ n(plot.areaHectares) }} ha</p>
          <p>{{ t('plots.location') }}: {{ plot.location }}</p>
          <p>
            {{ t('plots.status') }}:
            {{ t(plot.status === 'ACTIVE' ? 'plots.active' : 'plots.inactive') }}
          </p>
        </div>

        <router-link
            class="action-link"
            :to="`/plots/${plot.id}/crops/new`"
        >
          + Register Crop
        </router-link>
      </div>

      <div class="crop-list-filters">
        <div class="filter-field">
          <label for="crop-search">Search</label>
          <pv-input-text id="crop-search" placeholder="Search crops" disabled />
        </div>

        <div class="filter-field">
          <label for="crop-filter">Filter by</label>
          <pv-select
              input-id="crop-filter"
              placeholder="All statuses"
              disabled
          />
        </div>
      </div>

      <p>Total: 0</p>
      <p>No crops registered yet.</p>
    </template>
  </section>
</template>
