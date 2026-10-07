<script setup>
import {computed, onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {usePlotsStore} from '../../application/plots.store.js';

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
    <router-link to="/plots">My plots</router-link>
    <h1>Agricultural Plot Registration</h1>
    <form @submit.prevent="registerPlot">
      <div class="plot-grid">
        <fieldset class="plot-card" :disabled="saving">
          <legend>Basic information</legend>
          <div class="form-field">
            <label for="plot-name">Plot name</label>
            <pv-input-text id="plot-name" v-model="form.name" required maxlength="100" />
          </div>
          <div class="form-field">
            <label for="plot-area">Surface (hectares)</label>
            <pv-input-text id="plot-area" v-model="form.areaHectares" type="number" min="0" step="any" required aria-describedby="area-help" />
            <small id="area-help">Enter an area greater than zero.</small>
          </div>
        </fieldset>
        <fieldset class="plot-card" :disabled="saving">
          <legend>Location</legend>
          <div class="form-field">
            <label for="plot-location">Address or location description</label>
            <pv-textarea id="plot-location" v-model="form.location" required maxlength="300" rows="4" />
          </div>
        </fieldset>
      </div>
      <p v-if="error" class="error-message" role="alert">{{ error }}</p>
      <div class="form-actions">
        <router-link v-if="!saving" to="/plots">Cancel</router-link>
        <pv-button type="submit" :label="saving ? 'Registering…' : 'Register plot'" :disabled="!valid || saving" />
      </div>
    </form>
  </section>
</template>
