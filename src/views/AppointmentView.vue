<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

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

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow"
        @click="createAppointment"
      >
        Nueva Cita
      </button>
    </div>

    <!-- Cards -->
    <div class="row g-4">
      <div
        class="col-md-4 mb-4"
        v-for="appointment in appointments"
        :key="appointment.id"
      >
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
          <div class="card-footer bg-white border-top-0 mt-auto p-3">
            <div class="grid grid-cols-3 gap-2">
              <button
                class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                @click="editAppointment(appointment.id)"
              >
                Editar
              </button>

              <button
                class="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                @click="removeAppointment(appointment.id)"
              >
                Eliminar
              </button>

              <button
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                @click="viewDetails(appointment)"
                data-bs-toggle="modal"
                data-bs-target="#appointmentDetailModal"
              >
                Detalle
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin registros -->
      <div
        v-if="appointments.length === 0"
        class="text-center mt-5 text-muted"
      >
        No hay citas registradas
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="appointmentDetailModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedAppointment">
          <div class="modal-header">
            <h5 class="modal-title">
              Detalle de la Cita #{{ selectedAppointment.id }}
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <p>
              <strong>Cliente:</strong>
              {{ selectedAppointment.user?.name }}
            </p>

            <p>
              <strong>Barbero:</strong>
              {{ selectedAppointment.barber?.name }}
            </p>

            <p>
              <strong>Servicio:</strong>
              {{ selectedAppointment.service?.name }}
            </p>

            <p>
              <strong>Fecha:</strong>
              {{ selectedAppointment.date }}
            </p>

            <p>
              <strong>Hora:</strong>
              {{ selectedAppointment.time }}
            </p>

            <p>
              <strong>Estado:</strong>

              <span
                v-if="selectedAppointment.status === 'en_proceso'"
                class="badge bg-warning text-dark"
              >
                En Proceso
              </span>

              <span v-else class="badge bg-success">
                Finalizada
              </span>
            </p>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
