
import {defineStore} from 'pinia';
import {ref, shallowRef} from 'vue';
import {CropsApi} from '../infrastructure/crops-api.js';
import {CropAssembler} from '../infrastructure/crop.assembler.js';
import {Crop} from '../domain/model/crop.entity.js';

export const useCropsStore = defineStore('crops', () => {
    const api = new CropsApi();
    const crops = shallowRef([]);
    const loading = ref(false);
    const saving = ref(false);
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

    async function registerCrop(attributes) {
        if (saving.value) return null;

        saving.value = true;
        error.value = '';

        try {
            const crop = new Crop(attributes);
            const response = await api.create(CropAssembler.toResourceFromEntity(crop));
            const savedCrop = CropAssembler.toEntityFromResource(response.data);

            crops.value = [...crops.value, savedCrop];
            return savedCrop;
        } catch {
            error.value = 'Unable to register crop.';
            return null;
        } finally {
            saving.value = false;
        }
    }

    return {crops, loading, saving, error, fetchCrops, registerCrop};
});
