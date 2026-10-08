
<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../../plots/application/plots.store.js';
import {useCropsStore} from '../../application/crops.store.js';

const route = useRoute();
const router = useRouter();
const {t} = useI18n();

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
    validationMessage.value = 'crops.requiredFields';
    return;
  }

  const area = plantedAreaHectares.value === null ||
  plantedAreaHectares.value === ''
      ? null
      : Number(plantedAreaHectares.value);

  if (area !== null && (!Number.isFinite(area) || area <= 0)) {
    validationMessage.value = 'crops.invalidArea';
    return;
  }

  if (area !== null && area > plot.value.areaHectares) {
    validationMessage.value = 'crops.exceedsPlotArea';
    return;
  }

  if (expectedHarvest.value && expectedHarvest.value < plantingDate.value) {
    validationMessage.value = 'crops.invalidHarvestDate';
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
      <router-link to="/plots">
        {{ t('navigation.plots') }}
      </router-link>
      /
      <router-link :to="`/plots/${route.params.id}/crops`">
        {{ t('crops.title') }}
      </router-link>
      / {{ t('crops.register') }}
    </p>

    <div class="page-heading">
      <h1>{{ t('crops.register') }}</h1>
      <p>{{ t('crops.registrationDescription') }}</p>
    </div>

    <p v-if="plotsLoading">{{ t('crops.loadingPlot') }}</p>

    <p v-else-if="plotsError" class="error-message">
      {{ t('plots.loadError') }}
    </p>

    <p v-else-if="!plot" class="empty-state">
      {{ t('crops.plotNotFound') }}
    </p>

    <template v-else>
      <p v-if="validationMessage" class="error-message">
        {{ t(validationMessage) }}
      </p>

      <p v-if="error" class="error-message">
        {{ t('crops.registerError') }}
      </p>

      <div class="crop-registration-grid">
        <fieldset class="crop-registration-section">
          <legend>{{ t('crops.basicInformation') }}</legend>

          <div class="crop-registration-field">
            <label for="crop-plot">
              {{ t('crops.plot') }} *
            </label>
            <pv-input-text
                id="crop-plot"
                :model-value="plot.name"
                disabled
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-name">
              {{ t('crops.cropType') }} *
            </label>
            <pv-input-text
                id="crop-name"
                v-model="name"
                :placeholder="t('crops.cropTypePlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-variety">
              {{ t('crops.variety') }} *
            </label>
            <pv-input-text
                id="crop-variety"
                v-model="variety"
                :placeholder="t('crops.varietyPlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-planting-date">
              {{ t('crops.plantingDate') }} *
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
              {{ t('crops.expectedHarvest') }}
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
              {{ t('crops.plantedArea') }}
            </label>
            <pv-input-text
                id="crop-area"
                v-model="plantedAreaHectares"
                type="number"
                min="0"
                step="0.01"
                :placeholder="t('crops.plantedAreaPlaceholder')"
            />
          </div>
        </fieldset>

        <fieldset class="crop-registration-section">
          <legend>{{ t('crops.additionalInformation') }}</legend>

          <div class="crop-registration-field">
            <label for="crop-sowing-method">
              {{ t('crops.sowingMethod') }}
            </label>
            <pv-input-text
                id="crop-sowing-method"
                v-model="sowingMethod"
                :placeholder="t('crops.sowingMethodPlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-irrigation">
              {{ t('crops.irrigationType') }}
            </label>
            <pv-input-text
                id="crop-irrigation"
                v-model="irrigationType"
                :placeholder="t('crops.irrigationPlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-soil">
              {{ t('crops.soilType') }}
            </label>
            <pv-input-text
                id="crop-soil"
                v-model="soilType"
                :placeholder="t('crops.soilPlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-image">
              {{ t('crops.imageUrl') }}
            </label>
            <pv-input-text
                id="crop-image"
                v-model="imageUrl"
                type="url"
                :placeholder="t('crops.imagePlaceholder')"
            />
          </div>

          <div class="crop-registration-field">
            <label for="crop-notes">
              {{ t('crops.notes') }}
            </label>
            <pv-textarea
                id="crop-notes"
                v-model="notes"
                rows="5"
                :placeholder="t('crops.notesPlaceholder')"
            />
          </div>
        </fieldset>
      </div>

      <div class="crop-registration-actions">
        <pv-button
            :label="t('crops.cancel')"
            severity="secondary"
            :disabled="saving"
            @click="cancel"
        />

        <pv-button
            :label="t('crops.register')"
            :loading="saving"
            :disabled="saving"
            @click="registerCrop"
        />
      </div>
    </template>
  </section>
</template>
