<script setup>
import { ref, onMounted } from "vue";

import ServiceModal from "../components/ServiceModal.vue";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/serviceService";

const services = ref([]);
const selectedService = ref(null);

const loadServices = async () => {
  try {
    const response = await getServices();
    services.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const openCreateModal = () => {
  selectedService.value = null;
};

const openEditModal = (service) => {
  selectedService.value = { ...service };
};

const saveService = async (data) => {
  try {
    if (data.id) {
      await updateService(data.id, data);
    } else {
      await createService(data);
    }

    await loadServices();
  } catch (error) {
    console.error(error);
  }
};

const removeService = async (id) => {
  if (!confirm("¿Eliminar servicio?")) return;

  try {
    await deleteService(id);

    await loadServices();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadServices();
});
</script>

<template>
  <div class="container mt-4">

    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h3 fw-bold text-dark">
        Servicios
      </h2>

      <button
        class="btn btn-primary fw-semibold shadow"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#serviceModal"
      >
        Agregar Servicio
      </button>
    </div>

    <!-- Tabla con Bootstrap -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden mt-6 border border-gray-300">
  <table class="min-w-full border-collapse">
    <thead class="bg-gray-800 text-white">
      <tr>
        <th class="px-4 py-3 text-left font-semibold">ID</th>
        <th class="px-4 py-3 text-left font-semibold">Nombre</th>
        <th class="px-4 py-3 text-left font-semibold">Descripción</th>
        <th class="px-4 py-3 text-left font-semibold">Precio</th>
        <th class="px-4 py-3 text-left font-semibold">Duración</th>
        <th class="px-4 py-3 text-center font-semibold">Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="service in services"
        :key="service.id"
        class="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition-colors duration-200"
      >
        <td class="px-4 py-3 text-gray-700">{{ service.id }}</td>
        <td class="px-4 py-3 font-medium text-gray-900">{{ service.name }}</td>
        <td class="px-4 py-3 text-gray-600">{{ service.description }}</td>
        <td class="px-4 py-3">
          <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
            ${{ service.price }}
          </span>
        </td>
        <td class="px-4 py-3 text-gray-700">{{ service.duration }} min</td>
        <td class="px-4 py-3 text-center">
          <div class="flex justify-center gap-2">
            <button
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-sm"
              @click="openEditModal(service)"
              data-bs-toggle="modal"
              data-bs-target="#serviceModal"
            >
              Editar
            </button>
            <button
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow-sm"
              @click="removeService(service.id)"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>

      <tr v-if="services.length === 0">
        <td colspan="6" class="text-center py-6 text-gray-500">
          No hay servicios registrados
        </td>
      </tr>
    </tbody>
  </table>
</div>


    <ServiceModal
      :service="selectedService"
      @save="saveService"
    />
  </div>
</template>
