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
  <div class="container mt-6">

    <div class="bg-white rounded-lg shadow-md border border-gray-200">

      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ form.id ? "Editar Cita" : "Nueva Cita" }}
        </h3>
      </div>

      <!-- Body -->
      <div class="px-4 py-5">
        <form @submit.prevent="saveAppointment" class="grid grid-cols-2 gap-4">

          <!-- Usuario -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Usuario</label>
            <select v-model="form.userId"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required>
              <option value="">Seleccione un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
          </div>

          <!-- Barbero -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Barbero</label>
            <select v-model="form.barberId"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required>
              <option value="">Seleccione un barbero</option>
              <option v-for="barber in barbers" :key="barber.id" :value="barber.id">{{ barber.name }}</option>
            </select>
          </div>

          <!-- Fecha -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" v-model="form.date"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required />
          </div>

          <!-- Hora -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Hora</label>
            <input type="time" v-model="form.time"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required />
          </div>

          <!-- Servicio -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Servicio</label>
            <select v-model="form.serviceId"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required>
              <option value="">Seleccione un servicio</option>
              <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
            </select>
          </div>

          <!-- Estado -->
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Estado</label>
            <select v-model="form.status"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required>
              <option value="en_proceso">En Proceso</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>

          <!-- Botones -->
          <div class="col-span-2 flex justify-end gap-3 mt-4">
            <button type="button"
              class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md transition"
              @click="router.push('/appointment')">
              Cancelar
            </button>
            <button type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-sm transition">
              Guardar
            </button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>


