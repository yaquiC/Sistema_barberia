<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { SquarePen, Trash2, Eye } from "lucide-vue-next";
import Swal from "sweetalert2";
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
    <div
      class="modal-content bg-slate-800 border border-slate-700 text-white"
      v-if="selectedAppointment"
    >

      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <h5 class="text-lg font-semibold text-white">
          Detalle de la Cita #{{ selectedAppointment.id }}
        </h5>

        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <!-- Body -->
      <div class="px-5 py-4">

        <div class="grid grid-cols-2 gap-y-4">

          <span class="font-semibold text-white">
            Cliente:
          </span>

          <span class="text-slate-300">
            {{ selectedAppointment.user?.name }}
          </span>

          <span class="font-semibold text-white">
            Barbero:
          </span>

          <span class="text-slate-300">
            {{ selectedAppointment.barber?.name }}
          </span>

          <span class="font-semibold text-white">
            Servicio:
          </span>

          <span class="text-slate-300">
            {{ selectedAppointment.service?.name }}
          </span>

          <span class="font-semibold text-white">
            Fecha:
          </span>

          <span class="text-slate-300">
            {{ selectedAppointment.date }}
          </span>

          <span class="font-semibold text-white">
            Hora:
          </span>

          <span class="text-slate-300">
            {{ selectedAppointment.time }}
          </span>

          <span class="font-semibold text-white">
            Estado:
          </span>

          <div>
            <span
              v-if="selectedAppointment.status === 'en_proceso'"
              class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300"
            >
              En Proceso
            </span>

            <span
              v-else
              class="px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-300"
            >
              Finalizada
            </span>
          </div>

        </div>

      </div>

      <!-- Footer -->
      <div class="flex justify-end border-t border-slate-700 px-4 py-3">
        <button
          class="bg-slate-700 hover:bg-slate-600 text-white font-medium px-4 py-2 rounded-md transition"
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
