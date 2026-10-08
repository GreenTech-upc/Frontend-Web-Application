
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';
import {useCropsStore} from '../../application/crops.store.js';

const route = useRoute();
const router = useRouter();

const plotsStore = usePlotsStore();
const {plots} = storeToRefs(plotsStore);

const cropsStore = useCropsStore();
const {saving, error} = storeToRefs(cropsStore);

const name = ref('');
const variety = ref('');
const plantingDate = ref(null);
const expectedHarvest = ref(null);
const showValidation = ref(false);

const plot = computed(() =>
    plots.value.find(plot => String(plot.id) === String(route.params.id))
);

const formatDate = date => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const cancel = () => {
  router.push(`/plots/${route.params.id}/crops`);
};

const registerCrop = async () => {
  showValidation.value = false;

  if (!plot.value || !name.value.trim() || !variety.value.trim() || !plantingDate.value) {
    showValidation.value = true;
    return;
  }

  const savedCrop = await cropsStore.registerCrop({
    plotId: plot.value.id,
    name: name.value,
    variety: variety.value,
    plantingDate: formatDate(plantingDate.value),
    expectedHarvest: formatDate(expectedHarvest.value)
  });

  if (savedCrop) {
    router.push(`/plots/${plot.value.id}/crops`);
  }
};

onMounted(() => plotsStore.fetchPlots());
</script>

<template>
  <section class="plots-page crop-registration">
    <p>
      <router-link to="/plots">My plots</router-link>
      / <router-link :to="`/plots/${route.params.id}/crops`">Crops</router-link>
      / Register Crop
    </p>

    <h1>Register Crop</h1>

    <p v-if="!plot">Loading plot information...</p>

    <template v-else>
      <p v-if="showValidation" class="error-message">
        Complete all required fields.
      </p>

      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="crop-registration-fields">
        <fieldset class="plot-card">
          <legend>Basic Information</legend>

          <div class="form-field">
            <label for="crop-plot">Plot *</label>
            <pv-input-text id="crop-plot" :model-value="plot.name" disabled />
          </div>

          <div class="form-field">
            <label for="crop-name">Crop type *</label>
            <pv-input-text
                id="crop-name"
                v-model="name"
                placeholder="Enter crop type"
            />
          </div>

          <div class="form-field">
            <label for="crop-variety">Variety *</label>
            <pv-input-text
                id="crop-variety"
                v-model="variety"
                placeholder="Enter variety"
            />
          </div>

          <div class="form-field">
            <label for="crop-planting-date">Planting date *</label>
            <pv-date-picker
                input-id="crop-planting-date"
                v-model="plantingDate"
                date-format="dd/mm/yy"
                show-icon
            />
          </div>

          <div class="form-field">
            <label for="crop-harvest">Expected harvest</label>
            <pv-date-picker
                input-id="crop-harvest"
                v-model="expectedHarvest"
                date-format="dd/mm/yy"
                show-icon
            />
          </div>
        </fieldset>
      </div>

      <div class="form-actions">
        <pv-button
            label="Cancel"
            severity="secondary"
            @click="cancel"
        />

        <pv-button
            label="Register"
            :loading="saving"
            :disabled="saving"
            @click="registerCrop"
        />
      </div>
    </template>
  </section>
</template>
