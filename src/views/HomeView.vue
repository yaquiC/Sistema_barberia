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
  <div class="p-8 bg-[#0A0A0A] min-h-screen text-white">

    <!-- Encabezado -->
    <div class="mb-10">
      <h1 class="text-4xl font-bold text-white">
        Panel de Administración
      </h1>

      <p class="text-gray-400 mt-2">
        Bienvenido al sistema de gestión de Legend Barber 💈
      </p>
    </div>

    <!-- Cards -->
    <div class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <!-- Citas -->
        <div
          class="bg-[#151515] border border-[#252525] rounded-2xl p-6 hover:border-blue-500 transition-all duration-300"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-400 text-sm">
                Citas
              </p>

              <h2 class="text-3xl font-bold text-white mt-2">
                {{ totalAppointments }}
              </h2>
            </div>

            <span class="text-5xl">📅</span>
          </div>
        </div>

        <!-- Usuarios -->
        <div
          class="bg-[#151515] border border-[#252525] rounded-2xl p-6 hover:border-green-500 transition-all duration-300"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-400 text-sm">
                Usuarios
              </p>

              <h2 class="text-3xl font-bold text-white mt-2">
                {{ totalUsers }}
              </h2>
            </div>

            <span class="text-5xl">👤</span>
          </div>
        </div>

        <!-- Barberos -->
        <div
          class="bg-[#151515] border border-[#252525] rounded-2xl p-6 hover:border-purple-500 transition-all duration-300"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-400 text-sm">
                Barberos
              </p>

              <h2 class="text-3xl font-bold text-white mt-2">
                {{ totalBarbers }}
              </h2>
            </div>

            <span class="text-5xl">💈</span>
          </div>
        </div>

        <!-- Servicios -->
        <div
          class="bg-[#151515] border border-[#252525] rounded-2xl p-6 hover:border-orange-500 transition-all duration-300"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-400 text-sm">
                Servicios
              </p>

              <h2 class="text-3xl font-bold text-white mt-2">
                {{ totalServices }}
              </h2>
            </div>

            <span class="text-5xl">✂️</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Tabla -->
    <div class="mt-4">
      <div
        class="bg-[#151515] rounded-2xl border border-[#252525] overflow-hidden"
      >

        <!-- Título -->
        <div class="px-6 py-5 border-b border-[#252525]">
          <h4 class="text-2xl font-bold text-white">
            Últimas Citas Registradas
          </h4>
        </div>

        <!-- Tabla -->
        <div class="overflow-x-auto">

          <table class="min-w-full">

            <thead class="bg-[#101010]">
              <tr>
                <th class="px-4 py-4 text-left text-gray-300">
                  Cliente
                </th>

                <th class="px-4 py-4 text-left text-gray-300">
                  Barbero
                </th>

                <th class="px-4 py-4 text-left text-gray-300">
                  Servicio
                </th>

                <th class="px-4 py-4 text-left text-gray-300">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="appointment in recentAppointments"
                :key="appointment.id"
                class="border-t border-[#252525] hover:bg-[#1F1F1F] transition"
              >
                <td class="px-4 py-4 text-white font-medium">
                  {{ appointment.user?.name }}
                </td>

                <td class="px-4 py-4 text-gray-300">
                  {{ appointment.barber?.name }}
                </td>

                <td class="px-4 py-4 text-gray-300">
                  {{ appointment.service?.name }}
                </td>

                <td class="px-4 py-4">

                  <span
                    v-if="appointment.status === 'en_proceso'"
                    class="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400"
                  >
                    En Proceso
                  </span>

                  <span
                    v-else
                    class="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400"
                  >
                    Finalizada
                  </span>

                </td>
              </tr>

              <tr v-if="recentAppointments.length === 0">
                <td
                  colspan="4"
                  class="text-center py-6 text-gray-400"
                >
                  No hay citas registradas
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </div>

  </div>
</template>
