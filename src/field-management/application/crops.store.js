
import {defineStore} from 'pinia';
import {ref, shallowRef} from 'vue';
import {CropsApi} from '../infrastructure/crops-api.js';
import {CropAssembler} from '../infrastructure/crop.assembler.js';

export const useCropsStore = defineStore('crops', () => {
    const api = new CropsApi();
    const crops = shallowRef([]);
    const loading = ref(false);
    const error = ref('');

    async function fetchCrops() {
        loading.value = true;
        error.value = '';

        try {
            crops.value = CropAssembler.toEntitiesFromResponse(await api.getAll());
        } catch {
            error.value = 'Unable to load crops.';
        } finally {
            loading.value = false;
        }
    }

    return {crops, loading, error, fetchCrops};
});
