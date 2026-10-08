<script setup>
import {ref} from 'vue'

const crop = ref({
  name: 'Maíz',
  variety: 'Maíz amarillo duro',
  plot: 'Parcela Norte',
  sowingDate: '15/08/2026',
  growthStage: 'Etapa vegetativa',
  idealHumidity: '60% - 75%'
})
</script>

<template>
  <section class="crop-details">
    <h1>Detalles del cultivo</h1>

    <div class="crop-details__divider"></div>

    <pv-card class="crop-details__card">
      <template #title>
        Información del cultivo
      </template>

      <template #content>
        <div class="crop-details__information">

          <div class="crop-details__row">
            <span>Cultivo</span>
            <strong>{{ crop.name }}</strong>
          </div>

          <div class="crop-details__row">
            <span>Variedad</span>
            <strong>{{ crop.variety }}</strong>
          </div>

          <div class="crop-details__row">
            <span>Parcela</span>
            <strong>{{ crop.plot }}</strong>
          </div>

          <div class="crop-details__row">
            <span>Fecha de siembra</span>
            <strong>{{ crop.sowingDate }}</strong>
          </div>

          <div class="crop-details__row">
            <span>Etapa de crecimiento</span>
            <strong>{{ crop.growthStage }}</strong>
          </div>

          <div class="crop-details__row">
            <span>Humedad ideal</span>
            <strong>{{ crop.idealHumidity }}</strong>
          </div>

        </div>
      </template>
    </pv-card>

    <div class="crop-details__actions">
      <pv-button
          label="Volver"
          icon="pi pi-arrow-left"
          severity="secondary"
      />
    </div>
  </section>
</template>

<style scoped>
.crop-details {
  max-width: 760px;
  margin: 0 auto;
  padding: 32px;
}

.crop-details h1 {
  color: #17221c;
}

.crop-details__divider {
  height: 2px;
  margin: 24px 0 32px;
  background: #1976a8;
}

.crop-details__card {
  background: #1976a8;
}

.crop-details__card :deep(.p-card-title) {
  color: #ffffff;
}

.crop-details__information {
  display: grid;
  gap: 16px;
}

.crop-details__row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
}

.crop-details__actions {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .crop-details {
    padding: 16px;
  }

  .crop-details__row {
    flex-direction: column;
    gap: 4px;
  }
}
</style>