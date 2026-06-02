<script setup>
import { useRoute } from "vue-router";

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

        <router-link to="/"
          class="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
          active-class="bg-slate-900 text-blue-400 border-l-4 border-blue-500">
          <img src="@/assets/icons/casa.png" class="w-4 h-4" />
          Inicio
        </router-link>

        <router-link to="/service"
          class="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
          active-class="bg-slate-900 text-blue-400 border-l-4 border-blue-500">
          <img src="@/assets/icons/barbero.png" class="w-4 h-4" />
          Servicios
        </router-link>

        <router-link to="/barber"
          class="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
          active-class="bg-slate-900 text-blue-400 border-l-4 border-blue-500">
          <img src="@/assets/icons/poste-de-barbero.png" class="w-4 h-4" />
          Barberos
        </router-link>

        <router-link to="/user"
          class="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
          active-class="bg-slate-900 text-blue-400 border-l-4 border-blue-500">
          <img src="@/assets/icons/usuario.png" class="w-4 h-4" />
          Usuarios
        </router-link>

        <router-link to="/appointment"
          class="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
          active-class="bg-slate-900 text-blue-400 border-l-4 border-blue-500">
          <img src="@/assets/icons/cita.png" class="w-4 h-4" />
          Citas
        </router-link>

      </nav>

      <!-- Logout -->
      <div class="border-t border-gray-800 p-4">
        <button @click="logout" class="flex items-center gap-3 text-sm text-gray-400 hover:text-red-500 transition">
          🚪
          <span>Cerrar Sesión</span>
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