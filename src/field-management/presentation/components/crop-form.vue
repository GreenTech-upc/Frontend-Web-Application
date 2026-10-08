
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';
import {useCropsStore} from '../../application/crops.store.js';

const route = useRoute();
const router = useRouter();

const plotsStore = usePlotsStore();
const {plots, loading: plotsLoading, error: plotsError} = storeToRefs(plotsStore);

const cropsStore = useCropsStore();
const {saving, error} = storeToRefs(cropsStore);

const name = ref('');
const variety = ref('');
const plantingDate = ref(null);
const expectedHarvest = ref(null);
const plantedAreaHectares = ref(null);
const sowingMethod = ref('');
const irrigationType = ref('');
const soilType = ref('');
const notes = ref('');
const imageUrl = ref('');
const validationMessage = ref('');

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
  validationMessage.value = '';

  if (!plot.value || !name.value.trim() || !variety.value.trim() || !plantingDate.value) {
    validationMessage.value = 'Complete all required fields.';
    return;
  }

  const area = plantedAreaHectares.value === null ||
  plantedAreaHectares.value === ''
      ? null
      : Number(plantedAreaHectares.value);

  if (area !== null && (!Number.isFinite(area) || area <= 0)) {
    validationMessage.value = 'The planted area must be greater than zero.';
    return;
  }

  if (area !== null && area > plot.value.areaHectares) {
    validationMessage.value = 'The planted area cannot exceed the plot area.';
    return;
  }

  if (expectedHarvest.value && expectedHarvest.value < plantingDate.value) {
    validationMessage.value = 'Expected harvest cannot be before the planting date.';
    return;
  }

  const savedCrop = await cropsStore.registerCrop({
    plotId: plot.value.id,
    name: name.value,
    variety: variety.value,
    plantingDate: formatDate(plantingDate.value),
    expectedHarvest: formatDate(expectedHarvest.value),
    plantedAreaHectares: area,
    sowingMethod: sowingMethod.value,
    irrigationType: irrigationType.value,
    soilType: soilType.value,
    notes: notes.value,
    imageUrl: imageUrl.value
  });

  if (savedCrop) {
    router.push(`/plots/${plot.value.id}/crops`);
  }
};

onMounted(() => plotsStore.fetchPlots());
</script>

<template>
  <section class="plots-page crop-registration">
    <p class="mb-3">
      <router-link to="/plots">My Plots</router-link>
      /
      <router-link :to="`/plots/${route.params.id}/crops`">
        Crops
      </router-link>
      / Register Crop
    </p>

    <div class="page-heading">
      <h1>Register Crop</h1>
      <p>Enter the information for the new crop.</p>
    </div>

    <p v-if="plotsLoading">Loading plot information...</p>
    <p v-else-if="plotsError" class="error-message">
      Unable to load plot information.
    </p>
    <p v-else-if="!plot" class="empty-state">
      Plot not found.
    </p>

    <template v-else>
      <p v-if="validationMessage" class="error-message">
        {{ validationMessage }}
      </p>

      <p v-if="error" class="error-message">
        {{ error }}
      </p>

      <div class="crop-registration-grid">
        <fieldset class="crop-registration-section">
          <legend>Basic Information</legend>

          <div class="crop-registration-field">
            <label for="crop-plot">Plot *</label>
            <pv-input-text
                id="crop-plot"
                :model-value="plot.name"
                disabled
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-name">Crop type *</label>
            <pv-input-text
                id="crop-name"
                v-model="name"
                placeholder="Enter crop type"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-variety">Variety *</label>
            <pv-input-text
                id="crop-variety"
                v-model="variety"
                placeholder="Enter variety"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-planting-date">
              Planting date *
            </label>
            <pv-date-picker
                input-id="crop-planting-date"
                v-model="plantingDate"
                date-format="dd/mm/yy"
                show-icon
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-harvest">
              Expected harvest
            </label>
            <pv-date-picker
                input-id="crop-harvest"
                v-model="expectedHarvest"
                date-format="dd/mm/yy"
                show-icon
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-area">
              Planted area (ha)
            </label>
            <pv-input-text
                id="crop-area"
                v-model="plantedAreaHectares"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter planted area"
            />
          </div>
        </fieldset>

        <fieldset class="crop-registration-section">
          <legend>Additional Information</legend>

          <div class="crop-registration-field">
            <label for="crop-sowing-method">
              Sowing method
            </label>
            <pv-input-text
                id="crop-sowing-method"
                v-model="sowingMethod"
                placeholder="Enter sowing method"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-irrigation">
              Irrigation type
            </label>
            <pv-input-text
                id="crop-irrigation"
                v-model="irrigationType"
                placeholder="Enter irrigation type"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-soil">
              Soil type
            </label>
            <pv-input-text
                id="crop-soil"
                v-model="soilType"
                placeholder="Enter soil type"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-image">
              Reference image URL
            </label>
            <pv-input-text
                id="crop-image"
                v-model="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-notes">
              Notes
            </label>
            <pv-textarea
                id="crop-notes"
                v-model="notes"
                rows="5"
                placeholder="Enter additional notes"
            />
          </div>
        </fieldset>
      </div>

      <div class="crop-registration-actions">
        <pv-button
            label="Cancel"
            severity="secondary"
            :disabled="saving"
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
