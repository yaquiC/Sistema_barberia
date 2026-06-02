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
            <h2 class="text-3xl font-bold text-gray-800">
              {{ totalAppointments }}
            </h2>
          </div>

          <div class="text-4xl">
            📅
          </div>
        </div>
      </div>

      <!-- Usuarios -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Usuarios</p>
            <h2 class="text-3xl font-bold text-gray-800">
              {{ totalUsers }}
            </h2>
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
            <h2 class="text-3xl font-bold text-gray-800">
              {{ totalBarbers }}
            </h2>
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
            <h2 class="text-3xl font-bold text-gray-800">
              {{ totalServices }}
            </h2>
          </div>

          <div class="text-4xl">
            ✂️
          </div>
        </div>
      </div>

    </div>

    <!-- Tabla Actividad Reciente -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-800">
          Últimas Citas Registradas
        </h3>
      </div>

      <div class="overflow-x-auto">

        <table class="min-w-full">

          <thead class="bg-slate-800 text-white">
            <tr>
              <th class="px-6 py-4 text-left">Cliente</th>
              <th class="px-6 py-4 text-left">Barbero</th>
              <th class="px-6 py-4 text-left">Servicio</th>
              <th class="px-6 py-4 text-left">Estado</th>


            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">

            <tr v-for="appointment in recentAppointments" :key="appointment.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-medium text-gray-800">
                {{ appointment.user?.name }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ appointment.barber?.name }}
              </td>

              <td class="px-6 py-4 text-gray-600">
                {{ appointment.service?.name }}
              </td>

              <td class="px-6 py-4">
                <span v-if="appointment.status === 'en_proceso'"
                  class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  En Proceso
                </span>

                <span v-else class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Finalizada
                </span>
              </td>
            </tr>

            <tr v-if="recentAppointments.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-500">
                No hay citas registradas
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>