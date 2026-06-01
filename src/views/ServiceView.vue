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

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Servicios</h2>

      <button
        class="btn btn-primary"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#serviceModal"
      >
        Nuevo Servicio
      </button>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">

        <table class="table table-hover align-middle">

          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="service in services"
              :key="service.id"
            >
              <td>{{ service.id }}</td>

              <td>{{ service.name }}</td>

              <td>{{ service.description }}</td>

              <td>${{ service.price }}</td>

              <td>{{ service.duration }} min</td>

              <td>

                <button
                  class="btn btn-success btn-sm me-2"
                  @click="openEditModal(service)"
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal"
                >
                  Editar
                </button>

                <button
                  class="btn btn-danger btn-sm"
                  @click="removeService(service.id)"
                >
                  Eliminar
                </button>

              </td>
            </tr>

            <tr v-if="services.length === 0">
              <td
                colspan="6"
                class="text-center"
              >
                No hay servicios registrados
              </td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>

    <ServiceModal
      :service="selectedService"
      @save="saveService"
    />

  </div>
</template>