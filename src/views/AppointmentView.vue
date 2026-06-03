<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SquarePen, Trash2, Eye } from "lucide-vue-next";
import {
  getAppointments,
  deleteAppointment,
} from "../services/appointmentService";

const router = useRouter();

const appointments = ref([]);
const selectedAppointment = ref(null);

const loadAppointments = async () => {
  try {
    const response = await getAppointments();
    appointments.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const editAppointment = (id) => {
  router.push(`/appointment/edit/${id}`);
};

const createAppointment = () => {
  router.push("/appointment/create");
};

const removeAppointment = async (id) => {
  if (!confirm("¿Eliminar cita?")) return;
  try {
    await deleteAppointment(id);
    await loadAppointments();
  } catch (error) {
    console.error(error);
  }
};

const viewDetails = (appointment) => {
  selectedAppointment.value = appointment;
};

onMounted(() => {
  loadAppointments();
});
</script>

<template>
  <div class="container mt-4">
    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Citas</h2>

      <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow"
        @click="createAppointment">
        Nueva Cita
      </button>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <div class="col-md-4 mb-4" v-for="appointment in appointments" :key="appointment.id">
        <div class="card shadow-lg border-0 rounded-4 h-100 d-flex flex-column">
          <div class="card-body p-4">
            <h4 class="fw-bold mb-3">
              {{ appointment.user?.name }}
            </h4>

            <div class="mb-2">
              <strong>Servicio:</strong>
              {{ appointment.service?.name }}
            </div>

            <div class="mb-2">
              <strong>Fecha:</strong>
              {{ appointment.date }}
            </div>

            <div>
              <strong>Hora:</strong>
              {{ appointment.time }}
            </div>
          </div>

          <!-- Footer -->
          <div class="card-footer bg-gray-800 border-t border-gray-700 mt-auto p-3">
            <div class="flex justify-center items-center gap-3">
              <button class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-sm transition"
                @click="editAppointment(appointment.id)" title="Editar">
                <SquarePen class="w-4 h-4" />
              </button>

              <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-sm transition"
                @click="removeAppointment(appointment.id)" title="Eliminar">
                <Trash2 class="w-4 h-4" />
              </button>

              <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-sm transition"
                @click="viewDetails(appointment)" data-bs-toggle="modal" data-bs-target="#appointmentDetailModal"
                title="Ver detalle">
                <Eye class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin registros -->
      <div v-if="appointments.length === 0" class="text-center mt-5 text-muted">
        No hay citas registradas
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="appointmentDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-white rounded-lg shadow-md border border-gray-200" v-if="selectedAppointment">

          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h5 class="text-lg font-semibold text-gray-800">
              Detalle de la Cita #{{ selectedAppointment.id }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Body -->
          <div class="px-5 py-4">

            <div class="grid grid-cols-2 gap-y-4">

              <span class="font-semibold text-gray-800">
                Cliente:
              </span>

              <span class="text-gray-600">
                {{ selectedAppointment.user?.name }}
              </span>

              <span class="font-semibold text-gray-800">
                Barbero:
              </span>

              <span class="text-gray-600">
                {{ selectedAppointment.barber?.name }}
              </span>

              <span class="font-semibold text-gray-800">
                Servicio:
              </span>

              <span class="text-gray-600">
                {{ selectedAppointment.service?.name }}
              </span>

              <span class="font-semibold text-gray-800">
                Fecha:
              </span>

              <span class="text-gray-600">
                {{ selectedAppointment.date }}
              </span>

              <span class="font-semibold text-gray-800">
                Hora:
              </span>

              <span class="text-gray-600">
                {{ selectedAppointment.time }}
              </span>

              <span class="font-semibold text-gray-800">
                Estado
              </span>

              <div>
                <span v-if="selectedAppointment.status === 'en_proceso'"
                  class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  En Proceso
                </span>

                <span v-else class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Finalizada
                </span>
              </div>

            </div>

          </div>

          <!-- Footer -->
          <div class="flex justify-end border-t border-gray-200 px-4 py-3">
            <button class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md transition"
              data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>
