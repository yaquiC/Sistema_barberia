<script setup>
import { ref, onMounted } from "vue";
import BarberModal from "../components/BarberModal.vue";

import {
  getBarbers,
  createBarber,
  updateBarber,
  deleteBarber,
} from "../services/barberService";

const barbers = ref([]);
const selectedBarber = ref(null);

const loadBarbers = async () => {
  try {
    const response = await getBarbers();
    barbers.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const openCreateModal = () => {
  selectedBarber.value = null;
};

const openEditModal = (barber) => {
  selectedBarber.value = { ...barber };
};

const saveBarber = async (data) => {
  try {
    if (data.id) {
      await updateBarber(data.id, data);
    } else {
      await createBarber(data);
    }
    await loadBarbers();
  } catch (error) {
    console.error(error);
  }
};

const removeBarber = async (id) => {
  if (!confirm("¿Eliminar barbero?")) return;
  try {
    await deleteBarber(id);
    barbers.value = barbers.value.filter(barber => barber.id !== id);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadBarbers();
});
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Barberos</h2>
      <button
        class="btn btn-primary"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#barberModal"
      >
        Nuevo Barbero
      </button>
    </div>

    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="barber in barbers"
        :key="barber.id"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ barber.name }}</h5>
            <p class="card-text">
              <strong>Especialidad:</strong> {{ barber.specialty?.name || "N/A" }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button
              class="btn btn-success btn-sm"
              @click="openEditModal(barber)"
              data-bs-toggle="modal"
              data-bs-target="#barberModal"
            >
              Editar
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="removeBarber(barber.id)"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div v-if="barbers.length === 0" class="text-center mt-4">
        <p>No hay barberos registrados</p>
      </div>
    </div>

    <BarberModal
      :barber="selectedBarber"
      @save="saveBarber"
    />
  </div>
</template>
