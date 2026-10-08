
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';
import {useCropsStore} from '../../application/crops.store.js';

const route = useRoute();
const {t, n} = useI18n();

const plotsStore = usePlotsStore();
const {plots, loading: plotsLoading, error: plotsError} = storeToRefs(plotsStore);

const cropsStore = useCropsStore();
const {crops, loading: cropsLoading, error: cropsError} = storeToRefs(cropsStore);

const search = ref('');
const status = ref('');

const plot = computed(() =>
    plots.value.find(plot => String(plot.id) === String(route.params.id))
);

const plotCrops = computed(() =>
    crops.value.filter(crop => String(crop.plotId) === String(route.params.id))
);

const filteredCrops = computed(() =>
    plotCrops.value.filter(crop =>
        `${crop.name} ${crop.variety}`.toLowerCase().includes(search.value.trim().toLowerCase())
        && (!status.value || crop.status === status.value)
    )
);

const statusOptions = [
  {label: 'All statuses', value: ''},
  {label: 'Active', value: 'ACTIVE'},
  {label: 'In progress', value: 'IN_PROGRESS'},
  {label: 'Completed', value: 'COMPLETED'}
];

onMounted(() => {
  plotsStore.fetchPlots();
  cropsStore.fetchCrops();
});
</script>

<template>
  <section class="plots-page" :aria-busy="plotsLoading || cropsLoading">
    <p class="mb-3">
      <router-link to="/plots">{{ t('navigation.plots') }}</router-link>
      / {{ plot?.name || route.params.id }} / Crops
    </p>

    <div class="page-heading">
      <h1>Registered Crops</h1>
      <p>Crops associated with this plot.</p>
    </div>

    <p v-if="plotsLoading">Loading plot...</p>
    <p v-else-if="plotsError" class="error-message">{{ t(plotsError) }}</p>
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
          <pv-input-text
              id="crop-search"
              v-model="search"
              placeholder="Search crops"
          />
        </div>

        <div class="filter-field">
          <label for="crop-filter">Filter by</label>
          <pv-select
              input-id="crop-filter"
              v-model="status"
              :options="statusOptions"
              option-label="label"
              option-value="value"
          />
        </div>
      </div>

      <p v-if="cropsLoading">Loading crops...</p>
      <p v-else-if="cropsError" class="error-message">{{ cropsError }}</p>

      <template v-else>
        <p>Total: {{ filteredCrops.length }}</p>

        <p v-if="!plotCrops.length" class="empty-state">
          No crops registered yet.
        </p>

        <p v-else-if="!filteredCrops.length" class="empty-state">
          No matching crops found.
        </p>

        <div v-else class="plot-grid">
          <article
              v-for="crop in filteredCrops"
              :key="crop.id"
              class="plot-card registered-plot"
          >
            <h2>{{ crop.name }}</h2>
            <p>Variety: {{ crop.variety }}</p>
            <p>Planting date: {{ crop.plantingDate }}</p>
            <p>Expected harvest: {{ crop.expectedHarvest || '-' }}</p>
            <p>Status: {{ crop.status }}</p>

            <router-link :to="`/plots/${plot.id}/crops/${crop.id}`">
              Details
            </router-link>
          </article>
        </div>
      </template>
    </template>
  </section>
</template>
