<script setup>
import {useI18n} from 'vue-i18n';
import {computed, onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

const {t} = useI18n();
const router = useRouter();
const store = usePlotsStore();
const {saving, error} = storeToRefs(store);
const form = reactive({name: '', areaHectares: '', location: ''});
const valid = computed(() => form.name.trim() && form.location.trim()
  && Number.isFinite(Number(form.areaHectares)) && Number(form.areaHectares) > 0);

onMounted(() => { store.error = ''; });

async function registerPlot() {
  if (!valid.value || saving.value) return;
  const plot = await store.registerPlot({...form, areaHectares: Number(form.areaHectares)});
  if (plot) await router.push({name: 'plot-details', params: {id: plot.id}, query: {registered: 'true'}});
}
</script>

<template>
  <section class="plots-page">
    <router-link to="/plots">{{ t('plots.back') }}</router-link>
    <h1>{{ t('plots.registrationTitle') }}</h1>
    <form @submit.prevent="registerPlot">
      <div class="plot-grid">
        <fieldset class="plot-card" :disabled="saving">
          <legend>{{ t('plots.basicInformation') }}</legend>
          <div class="form-field">
            <label for="plot-name">{{ t('plots.name') }}</label>
            <pv-input-text id="plot-name" v-model="form.name" required maxlength="100" />
          </div>
          <div class="form-field">
            <label for="plot-area">{{ t('plots.area') }}</label>
            <pv-input-text id="plot-area" v-model="form.areaHectares" type="number" min="0" step="any" required aria-describedby="area-help" />
            <small id="area-help">{{ t('plots.areaHelp') }}</small>
          </div>
        </fieldset>
        <fieldset class="plot-card" :disabled="saving">
          <legend>{{ t('plots.location') }}</legend>
          <div class="form-field">
            <label for="plot-location">{{ t('plots.locationDescription') }}</label>
            <pv-textarea id="plot-location" v-model="form.location" required maxlength="300" rows="4" />
          </div>
        </fieldset>
      </div>
      <p v-if="error" class="error-message" role="alert">{{ t(error) }}</p>
      <div class="form-actions">
        <router-link v-if="!saving" to="/plots">{{ t('plots.cancel') }}</router-link>
        <pv-button type="submit" :label="t(saving ? 'plots.registering' : 'plots.register')" :disabled="!valid || saving" />
      </div>
    </form>
  </section>
</template>
