import {defineStore} from 'pinia';
import {ref, shallowRef} from 'vue';
import {PlotsApi} from '../infrastructure/plots-api.js';
import {AgriculturalPlotAssembler} from '../infrastructure/agricultural-plot.assembler.js';
import {AgriculturalPlot} from '../domain/model/agricultural-plot.entity.js';

export const usePlotsStore = defineStore('plots', () => {
  const api = new PlotsApi();
  const plots = shallowRef([]);
  const selectedPlot = shallowRef(null);
  const loading = ref(false);
  const saving = ref(false);
  const error = ref('');
  const notFound = ref(false);

  async function fetchPlots() {
    loading.value = true;
    error.value = '';
    try {
      plots.value = AgriculturalPlotAssembler.toEntitiesFromResponse(await api.getAll());
    } catch {
      error.value = 'Unable to load plots. Please try again.';
    } finally {
      loading.value = false;
    }
  }

  async function fetchPlot(id) {
    loading.value = true;
    error.value = '';
    notFound.value = false;
    selectedPlot.value = null;
    try {
      const response = await api.getById(id);
      selectedPlot.value = AgriculturalPlotAssembler.toEntityFromResource(response.data);
    } catch (failure) {
      notFound.value = failure.response?.status === 404;
      if (!notFound.value) error.value = 'Unable to load plot details. Please try again.';
    } finally {
      loading.value = false;
    }
  }

  async function registerPlot(attributes) {
    if (saving.value) return null;
    saving.value = true;
    error.value = '';
    try {
      const plot = new AgriculturalPlot({...attributes, createdAt: new Date().toISOString()});
      const response = await api.create(AgriculturalPlotAssembler.toResourceFromEntity(plot));
      const savedPlot = AgriculturalPlotAssembler.toEntityFromResource(response.data);
      plots.value = [...plots.value, savedPlot];
      return savedPlot;
    } catch {
      error.value = 'Unable to register the plot. Check the information and try again.';
      return null;
    } finally {
      saving.value = false;
    }
  }

  return {plots, selectedPlot, loading, saving, error, notFound, fetchPlots, fetchPlot, registerPlot};
});
