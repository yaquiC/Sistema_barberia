<script setup>

import { useRoute } from "vue-router";
import {
  House,
  Scissors,
  UserRound,
  Users,
  CalendarDays,
  LogOut,
} from "lucide-vue-next";

const route = useRoute();
</script>

<template>
  <div class="layout">

    <aside v-if="route.path !== '/login'"
      class="w-64 bg-black text-gray-400 flex flex-col min-h-screen border-r border-gray-800">
      <!-- Logo -->
      <div class="p-6 border-b border-gray-800">
        <div class="flex items-center gap-3">
          <img src="@/assets/logo.png" alt="Logo" class="w-10 h-10 rounded-full" />

          <div>
            <h3 class="text-white font-semibold">
              Legend Barber
            </h3>
          </div>
        </div>
      </div>

      <!-- Menú -->
      <nav class="flex-1 py-4">

        <router-link to="/" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition">
          <House :size="20" />
          <span>Inicio</span>
        </router-link>

        <router-link to="/service" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition">
          <Scissors :size="20" />
          Servicios
        </router-link>

        <router-link to="/barber" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition">
          <UserRound :size="20" />
          Barberos
        </router-link>

        <router-link to="/user" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition">
          <Users :size="20" />
          Usuarios
        </router-link>

        <router-link to="/appointment" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition">
          <CalendarDays :size="20" />
          Citas
        </router-link>

      </nav>

      <!-- Logout -->
      <div class="border-t border-gray-800 p-4">
        <button @click="logout" class="flex items-center gap-3 text-sm text-gray-400 hover:text-red-500 transition">
          <LogOut :size="20" />
          Cerrar Sesión
        </button>
      </div>
    </aside>

    <main :class="{
      'content': route.path !== '/login',
      'content-full': route.path === '/login'
    }">
      <router-view />
    </main>

  </div>
</template>

<style>
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 24px;
  background: #f1f5f9;
}

.content-full {
  width: 100%;
}
</style>