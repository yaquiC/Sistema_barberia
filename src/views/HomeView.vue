<script setup>
import { ref, onMounted } from "vue";

import { getUsers } from "../services/UserService";
import { getBarbers } from "../services/barberService";
import { getServices } from "../services/serviceService";
import { getAppointments } from "../services/appointmentService";

const totalUsers = ref(0);
const totalBarbers = ref(0);
const totalServices = ref(0);
const totalAppointments = ref(0);

const loadDashboard = async () => {
  try {
    const [users, barbers, services, appointments] = await Promise.all([
      getUsers(),
      getBarbers(),
      getServices(),
      getAppointments(),
    ]);

    totalUsers.value = users.data.length;
    totalBarbers.value = barbers.data.length;
    totalServices.value = services.data.length;
    totalAppointments.value = appointments.data.length;
  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }
};

onMounted(() => {
  loadDashboard();
});
</script>

<template>
  <div class="p-6">

    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800">
        Panel de Administración
      </h1>

      <p class="text-gray-500 mt-2">
        Bienvenido al sistema de gestión de Legend Barber 💈
      </p>
    </div>

    <!-- Tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      <!-- Citas -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Citas</p>
            <h2 class="text-3xl font-bold">{{ totalAppointments }}</h2>
          </div>

          <div class="text-4xl">
            📅
          </div>
        </div>
      </div>

      <!-- Clientes -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Clientes</p>
            <h2 class="text-3xl font-bold">{{ totalUsers }}</h2>
          </div>

          <div class="text-4xl">
            👤
          </div>
        </div>
      </div>

      <!-- Barberos -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Barberos</p>
            <h2 class="text-3xl font-bold">{{ totalBarbers }}</h2>
          </div>

          <div class="text-4xl">
            💈
          </div>
        </div>
      </div>

      <!-- Servicios -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Servicios</p>
            <h2 class="text-3xl font-bold">{{ totalServices }}</h2>
          </div>

          <div class="text-4xl">
            ✂️
          </div>
        </div>
      </div>

    </div>

    <!-- Sección inferior -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Actividad reciente -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-xl font-semibold mb-4">
          Actividad Reciente
        </h3>

        <ul class="space-y-3">
          <li class="border-b pb-2">
            📅 Nueva cita registrada para Pedro
          </li>

          <li class="border-b pb-2">
            ✂️ Servicio "Corte Premium" agregado
          </li>

          <li class="border-b pb-2">
            💈 Nuevo barbero registrado
          </li>
        </ul>
      </div>

      <!-- Información -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h3 class="text-xl font-semibold mb-4">
          Resumen del Sistema
        </h3>

        <div class="space-y-4">
          <div>
            <p class="text-gray-500">
              Citas para hoy
            </p>

            <p class="font-bold text-lg">
              8 citas programadas
            </p>
          </div>

          <div>
            <p class="text-gray-500">
              Servicio más solicitado
            </p>

            <p class="font-bold text-lg">
              Corte de Cabello
            </p>
          </div>

          <div>
            <p class="text-gray-500">
              Estado del sistema
            </p>

            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Activo
            </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>