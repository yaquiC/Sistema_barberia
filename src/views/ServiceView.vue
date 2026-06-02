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
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Servicios
      </h2>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#serviceModal"
      >
        Nuevo Servicio
      </button>
    </div>

    <!-- Tabla -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">

      <table class="min-w-full">

        <thead class="bg-slate-800 text-white">
          <tr>
            <th class="px-6 py-4 text-left">ID</th>
            <th class="px-6 py-4 text-left">Nombre</th>
            <th class="px-6 py-4 text-left">Descripción</th>
            <th class="px-6 py-4 text-left">Precio</th>
            <th class="px-6 py-4 text-left">Duración</th>
            <th class="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">

          <tr
            v-for="service in services"
            :key="service.id"
            class="hover:bg-gray-50 transition duration-200"
          >
            <td class="px-6 py-4 text-gray-700">
              {{ service.id }}
            </td>

            <td class="px-6 py-4 font-medium text-gray-900">
              {{ service.name }}
            </td>

            <td class="px-6 py-4 text-gray-600">
              {{ service.description }}
            </td>

            <td class="px-6 py-4">
              <span
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
              >
                ${{ service.price }}
              </span>
            </td>

            <td class="px-6 py-4 text-gray-700">
              {{ service.duration }} min
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-center gap-2">

                <button
                  class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                  @click="openEditModal(service)"
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal"
                >
                  Editar
                </button>

                <button
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  @click="removeService(service.id)"
                >
                  Eliminar
                </button>

              </div>
            </td>
          </tr>

          <tr v-if="services.length === 0">
            <td
              colspan="6"
              class="text-center py-8 text-gray-500"
            >
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