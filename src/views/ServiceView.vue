<script setup>
import { ref, onMounted } from "vue";
import { Plus, Pencil, Trash2 } from "lucide-vue-next";
import ServiceModal from "../components/ServiceModal.vue";
import Swal from "sweetalert2";
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

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Servicio actualizado correctamente",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

    } else {
      await createService(data);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Servicio creado correctamente",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }

    await loadServices();

  } catch (error) {
    console.error(error);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Error al guardar el servicio",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  }
};

const removeService = async (id) => {
  const result = await Swal.fire({
    title: "¿Eliminar servicio?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteService(id);

    await loadServices();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Servicio eliminado correctamente",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });

  } catch (error) {
    console.error(error);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Error al eliminar el servicio",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
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
      <h2 class="fw-bold text-white">
        Servicios
      </h2>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow flex items-center gap-2"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#serviceModal"
      >
        <Plus class="w-8 h-8" />
        Agregar Servicio
      </button>
    </div>

    <!-- Tabla Dark -->
    <div
      class="bg-[#151515] rounded-xl shadow-lg overflow-hidden border border-[#252525]"
    >
      <table class="min-w-full border-collapse">

        <thead class="bg-[#0F0F0F] text-white">
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
            class="border-t border-[#252525] hover:bg-[#1F1F1F] transition"
          >
            <td class="px-4 py-3 text-gray-300">
              {{ service.id }}
            </td>

            <td class="px-4 py-3 font-medium text-white">
              {{ service.name }}
            </td>

            <td class="px-4 py-3 text-gray-400">
              {{ service.description }}
            </td>

            <td class="px-4 py-3">
              <span
                class="bg-green-900 text-green-300 px-2 py-1 rounded-full text-sm font-semibold"
              >
                ${{ service.price }}
              </span>
            </td>

            <td class="px-4 py-3 text-gray-300">
              {{ service.duration }} min
            </td>

            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-2">

                <button
                  class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg shadow-sm transition"
                  @click="openEditModal(service)"
                  data-bs-toggle="modal"
                  data-bs-target="#serviceModal"
                  title="Editar"
                >
                  <Pencil class="w-6 h-6" />
                </button>

                <button
                  class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-sm transition"
                  @click="removeService(service.id)"
                  title="Eliminar"
                >
                  <Trash2 class="w-6 h-6" />
                </button>

              </div>
            </td>
          </tr>

          <tr v-if="services.length === 0">
            <td
              colspan="6"
              class="text-center py-6 text-gray-500"
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
