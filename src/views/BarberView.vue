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

    barbers.value = barbers.value.filter(
      barber => barber.id !== id
    );
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

    <div class="card shadow-sm">
      <div class="card-body">

        <table class="table table-hover align-middle">

          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th width="180">Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="barber in barbers"
              :key="barber.id"
            >
              <td>{{ barber.id }}</td>

              <td>{{ barber.name }}</td>

              <td>
                {{ barber.specialty?.name }}
              </td>

              <td>

                <button
                  class="btn btn-success btn-sm me-2"
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

              </td>
            </tr>

            <tr v-if="barbers.length === 0">
              <td
                colspan="4"
                class="text-center"
              >
                No hay barberos registrados
              </td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>

    <BarberModal
      :barber="selectedBarber"
      @save="saveBarber"
    />

  </div>
</template>