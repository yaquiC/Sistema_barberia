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

const recentAppointments = ref([]);

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

    recentAppointments.value = appointments.data
      .slice(-5)
      .reverse();

  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }
};

onMounted(() => {
  loadDashboard();
});
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">

    <!-- Encabezado -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-gray-800">
        Panel de Administración
      </h1>
      <p class="text-gray-500 mt-2">
        Bienvenido al sistema de gestión de Legend Barber 💈
      </p>
    </div>

    <!-- Bloque de Cards -->
    <div class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <!-- Card Citas -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">Citas</p>
              <h2 class="text-3xl font-bold text-gray-800 mt-2">{{ totalAppointments }}</h2>
            </div>
            <span class="text-5xl">📅</span>
          </div>
        </div>

        <!-- Card Usuarios -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">Usuarios</p>
              <h2 class="text-3xl font-bold text-gray-800 mt-2">{{ totalUsers }}</h2>
            </div>
            <span class="text-5xl">👤</span>
          </div>
        </div>

        <!-- Card Barberos -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">Barberos</p>
              <h2 class="text-3xl font-bold text-gray-800 mt-2">{{ totalBarbers }}</h2>
            </div>
            <span class="text-5xl">💈</span>
          </div>
        </div>

        <!-- Card Servicios -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-500 text-sm">Servicios</p>
              <h2 class="text-3xl font-bold text-gray-800 mt-2">{{ totalServices }}</h2>
            </div>
            <span class="text-5xl">✂️</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque de Tabla -->
    <div class="mt-4">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300">
        <!-- Título -->
        <div class="px-3 py-3 border-b border-gray-200">
          <h4 class="text-2xl font-bold text-gray-800">Últimas Citas Registradas</h4>
        </div>

        <!-- Tabla -->
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="px-4 py-3 text-left">Cliente</th>
                <th class="px-4 py-3 text-left">Barbero</th>
                <th class="px-4 py-3 text-left">Servicio</th>
                <th class="px-4 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in recentAppointments" :key="appointment.id"
                  class="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition-colors">
                <td class="px-4 py-3 font-medium text-gray-800">{{ appointment.user?.name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ appointment.barber?.name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ appointment.service?.name }}</td>
                <td class="px-4 py-3">
                  <span v-if="appointment.status === 'en_proceso'"
                        class="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    En Proceso
                  </span>
                  <span v-else
                        class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Finalizada
                  </span>
                </td>
              </tr>
              <tr v-if="recentAppointments.length === 0">
                <td colspan="4" class="text-center py-6 text-gray-500">No hay citas registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>
