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
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Citas</h2>
      <button class="btn btn-primary" @click="createAppointment">
        Nueva Cita
      </button>
    </div>

    <div class="row">
      <div
        class="col-md-4 mb-4"
        v-for="appointment in appointments"
        :key="appointment.id"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">{{ appointment.user?.name }}</h5>
            <p class="card-text">
              <strong>Servicio:</strong> {{ appointment.service?.name }} <br />
              <strong>Fecha:</strong> {{ appointment.date }} <br />
              <strong>Hora:</strong> {{ appointment.time }}
            </p>
          </div>

          <div class="card-footer d-flex justify-content-between">
            <div>
              <button
                class="btn btn-success btn-sm me-2"
                @click="editAppointment(appointment.id)"
              >
                Editar
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="removeAppointment(appointment.id)"
              >
                Eliminar
              </button>
            </div>
            <button
              class="btn btn-info btn-sm"
              @click="viewDetails(appointment)"
              data-bs-toggle="modal"
              data-bs-target="#appointmentDetailModal"
            >
              Ver Detalle
            </button>
          </div>
        </div>
      </div>

      <div v-if="appointments.length === 0" class="text-center mt-4">
        <p>No hay citas registradas</p>
      </div>
    </div>

    <!-- Modal de detalle -->
    <div
      class="modal fade"
      id="appointmentDetailModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedAppointment">
          <div class="modal-header">
            <h5 class="modal-title">Detalle de la Cita #{{ selectedAppointment.id }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p><strong>Cliente:</strong> {{ selectedAppointment.user?.name }}</p>
            <p><strong>Barbero:</strong> {{ selectedAppointment.barber?.name }}</p>
            <p><strong>Servicio:</strong> {{ selectedAppointment.service?.name }}</p>
            <p><strong>Fecha:</strong> {{ selectedAppointment.date }}</p>
            <p><strong>Hora:</strong> {{ selectedAppointment.time }}</p>
            <p>
              <strong>Estado:</strong>
              <span
                v-if="selectedAppointment.status === 'en_proceso'"
                class="badge bg-warning text-dark"
              >
                En Proceso
              </span>
              <span v-else class="badge bg-success">Finalizada</span>
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
