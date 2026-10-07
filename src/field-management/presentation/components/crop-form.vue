<script setup>
import {ref} from 'vue'

const cropTypes = ref([
  {name: 'Maíz'},
  {name: 'Soya'},
  {name: 'Uva'},
  {name: 'Trigo'}
])

const cropVarieties = ref([
  {name: 'Maíz amarillo duro'},
  {name: 'Maíz híbrido'},
  {name: 'Maíz morado'}
])

const selectedCrop = ref(null)
const selectedVariety = ref(null)
const sowingDate = ref(null)
</script>

<template>
  <section class="crop-form">
    <h1>Registro de cultivo</h1>

    <div class="crop-form__divider"></div>

    <pv-card class="crop-form__card">
      <template #title>
        Información del cultivo
      </template>

      <template #content>
        <div class="crop-form__fields">
          <div class="crop-form__field">
            <label>Tipo de cultivo</label>

            <pv-select
                v-model="selectedCrop"
                :options="cropTypes"
                option-label="name"
                placeholder="Selecciona un cultivo"
                class="w-full"
            />
          </div>

          <div class="crop-form__field">
            <label>Variedad</label>

            <pv-select
                v-model="selectedVariety"
                :options="cropVarieties"
                option-label="name"
                placeholder="Selecciona una variedad"
                class="w-full"
            />
          </div>

          <div class="crop-form__field">
            <label>Fecha de siembra</label>

            <pv-date-picker
                v-model="sowingDate"
                date-format="dd/mm/yy"
                placeholder="Selecciona una fecha"
                show-icon
                class="w-full"
            />
          </div>
        </div>
      </template>
    </pv-card>

    <div class="crop-form__actions">
      <pv-button
          label="Cancelar"
          severity="secondary"
      />

      <pv-button
          label="Registrar"
      />
    </div>
  </section>
</template>

<style scoped>
.crop-form {
  max-width: 760px;
  margin: 0 auto;
  padding: 32px;
}

.crop-form h1 {
  color: #17221c;
}

.crop-form__divider {
  height: 2px;
  margin: 24px 0 32px;
  background: #1976a8;
}

.crop-form__card {
  background: #1976a8;
}

.crop-form__card :deep(.p-card-title),
.crop-form__field label {
  color: #ffffff;
}

.crop-form__fields {
  display: grid;
  gap: 20px;
}

.crop-form__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.crop-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
}

@media (max-width: 640px) {
  .crop-form {
    padding: 16px;
  }

  .crop-form__actions {
    flex-direction: column-reverse;
  }
}
</style>