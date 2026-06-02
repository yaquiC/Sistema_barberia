<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { getUsers } from "../services/UserService";
import { getBarbers } from "../services/barberService";
import { getServices } from "../services/serviceService";

import {
  createAppointment,
  updateAppointment,
  getAppointmentById,
} from "../services/appointmentService";

const router = useRouter();
const route = useRoute();

const users = ref([]);
const barbers = ref([]);
const services = ref([]);

const form = ref({
  id: null,
  userId: "",
  barberId: "",
  serviceId: "",
  date: "",
  time: "",
  status: "en_proceso",
});

const loadData = async () => {
  try {
    const usersResponse = await getUsers();
    users.value = usersResponse.data;

    const barbersResponse = await getBarbers();
    barbers.value = barbersResponse.data;

    const servicesResponse = await getServices();
    services.value = servicesResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const loadAppointment = async () => {
  try {
    const id = route.params.id;

    if (!id) return;

    const response = await getAppointmentById(id);

    const appointment = response.data;

    form.value = {
      id: appointment.id,
      userId: appointment.user.id,
      barberId: appointment.barber.id,
      serviceId: appointment.service.id,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
    };
  } catch (error) {
    console.error(error);
  }
};

const saveAppointment = async () => {
  try {
    if (form.value.id) {
      await updateAppointment(
        form.value.id,
        form.value
      );
    } else {
      await createAppointment(form.value);
    }

    router.push("/appointment");
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await loadData();
  await loadAppointment();
});
</script>

<template>
  <div class="container mt-4">

    <div class="card shadow">

      <div class="card-header">
        <h3>
          {{
            form.id
              ? "Editar Cita"
              : "Nueva Cita"
          }}
        </h3>
      </div>

      <div class="card-body">

        <form @submit.prevent="saveAppointment">

          <div class="mb-3">
            <label class="form-label">
              Usuario
            </label>

            <select
              v-model="form.userId"
              class="form-select"
              required
            >
              <option value="">
                Seleccione un usuario
              </option>

              <option
                v-for="user in users"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">
              Barbero
            </label>

            <select
              v-model="form.barberId"
              class="form-select"
              required
            >
              <option value="">
                Seleccione un barbero
              </option>

              <option
                v-for="barber in barbers"
                :key="barber.id"
                :value="barber.id"
              >
                {{ barber.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">
              Servicio
            </label>

            <select
              v-model="form.serviceId"
              class="form-select"
              required
            >
              <option value="">
                Seleccione un servicio
              </option>

              <option
                v-for="service in services"
                :key="service.id"
                :value="service.id"
              >
                {{ service.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">
              Fecha
            </label>

            <input
              type="date"
              class="form-control"
              v-model="form.date"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Hora
            </label>

            <input
              type="time"
              class="form-control"
              v-model="form.time"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Estado
            </label>

            <select
              v-model="form.status"
              class="form-select"
              required
            >
              <option value="en_proceso">
                En Proceso
              </option>

              <option value="finalizada">
                Finalizada
              </option>
            </select>
          </div>

          <div class="d-flex gap-2">

            <button
              type="submit"
              class="btn btn-primary"
            >
              Guardar
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="router.push('/appointment')"
            >
              Cancelar
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>
