<script setup>
import { ref, onMounted } from "vue";
import { UserPlus, SquarePen, Trash2 } from "lucide-vue-next";
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
    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Barberos</h2>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow flex items-center gap-2"
        @click="openCreateModal" data-bs-toggle="modal" data-bs-target="#barberModal">
        <UserPlus :size="18" />
        Agregar Barbero
      </button>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <div class="col-md-4" v-for="barber in barbers" :key="barber.id">
        <div class="card shadow-lg border-0 rounded-4 h-100 d-flex flex-column">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3">
              {{ barber.name }}
            </h4>

            <div>
              <strong>Especialidad:</strong>
              {{ barber.specialty?.name || "N/A" }}
            </div>
          </div>

          <!-- Footer -->
          <div class="card-footer bg-transparent border-top border-[#252525] mt-auto p-3">
            <div class="flex justify-center items-center gap-3">
              <button
                class="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm transition"
                @click="openEditModal(barber)" data-bs-toggle="modal" data-bs-target="#barberModal" title="Editar">
                <SquarePen class="w-4 h-4" />
              </button>

              <button
                class="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition"
                @click="removeBarber(barber.id)" title="Eliminar">
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin registros -->
      <div v-if="barbers.length === 0" class="text-center mt-5 text-muted">
        No hay barberos registrados
      </div>
    </div>

    <BarberModal :barber="selectedBarber" @save="saveBarber" />
  </div>
</template>
