
<script setup>
import {computed, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';

const route = useRoute();
const {t} = useI18n();
const store = usePlotsStore();
const {plots} = storeToRefs(store);

const plot = computed(() =>
    plots.value.find(plot => String(plot.id) === String(route.params.id))
);

onMounted(() => store.fetchPlots());
</script>

<template>
  <section class="plots-page">
    <div class="page-heading">
      <h1>Registered Crops</h1>
      <p v-if="plot">{{ plot.name }}</p>
    </div>

    <router-link to="/plots">
      {{ t('plots.listTitle') }}
    </router-link>

    <p v-if="!plot">No se encontró la parcela seleccionada.</p>
  </section>
</template>
