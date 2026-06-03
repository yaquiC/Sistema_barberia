<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {Eye,Trash2,CalendarPlus} from "lucide-vue-next";
import Swal from "sweetalert2";
import {
  getAppointments,
  deleteAppointment
} from "../services/AppointmentService";

const router = useRouter();

const appointments = ref([]);

const loadAppointments = async () => {
  try {
    const response = await getAppointments();
    appointments.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

import AppointmentDetailModal from "../components/AppointmentDetailModal.vue";

const selectedAppointment = ref(null);

const showDetails = (appointment) => {
  selectedAppointment.value = appointment;
};

const createAppointment = () => {
  router.push("/appointment/create");
};

/*const editAppointment = (id) => {
  router.push(`/appointment/edit/${id}`);
};*/

const removeAppointment = async (id) => {
  const result = await Swal.fire({
    title: "¿Eliminar cita?",
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
    await deleteAppointment(id);

    await loadAppointments();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Cita eliminada correctamente",
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
      title: "Error al eliminar la cita",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  }
};

onMounted(() => {
  loadAppointments();
});
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Citas</h2>

      <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow flex items-center gap-2"
       @click="createAppointment">
       <CalendarPlus class="w-7 h-7" />
        Nueva Cita
      </button>
    </div>

    <div class="row g-4">

      <div class="col-md-4" v-for="appointment in appointments" :key="appointment.id">
        <div class="card shadow-lg border-0 rounded-4 h-100 d-flex flex-column">

          <div class="card-body p-4">

            <h4 class="fw-bold mb-3">
              Cita #{{ appointment.id }}
            </h4>

            <p class="mb-2">
              <strong>Cliente:</strong>
              {{ appointment.user?.name }}
            </p>

            <p class="mb-2">
              <strong>Barbero:</strong>
              {{ appointment.barber?.name }}
            </p>

            <p class="mb-2">
              <strong>Fecha:</strong>
              {{ appointment.date }}
            </p>

            <p class="mb-0">
              <strong>Hora:</strong>
              {{ appointment.time }}
            </p>

          </div>

          <!-- Footer -->
          <div class="card-footer bg-transparent border-0 mt-auto p-3">

            <div class="flex justify-center items-center gap-3">

              <!-- Ver detalle -->
              <button
                class="w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-sm transition"
                @click="showDetails(appointment)" data-bs-toggle="modal" data-bs-target="#appointmentDetailModal"
                title="Ver Detalle">
                <Eye class="w-7 h-7" />
              </button>

              <!-- Editar 
              <button
                class="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-sm transition"
                @click="editAppointment(appointment.id)" title="Editar">
                <SquarePen class="w-7 h-7" />
              </button> -->

              <!-- Eliminar -->
              <button
                class="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition"
                @click="removeAppointment(appointment.id)" title="Eliminar">
                <Trash2 class="w-7 h-7" />
              </button>

            </div>

          </div>

        </div>
      </div>

      <!-- Sin registros -->
      <div v-if="appointments.length === 0" class="text-center mt-5 text-muted">
        <span class="text-slate-300">
          No hay citas registradas
        </span>
      </div>

    </div>

    <AppointmentDetailModal :appointment="selectedAppointment" />

  </div>
</template>