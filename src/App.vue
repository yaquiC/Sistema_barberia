<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="layout">

    <aside v-if="route.path !== '/login'" class="sidebar">
      <h3 class="logo">
        Legend Barber
      </h3>

      <nav>
        <router-link to="/" class="menu-item">
          <img src="@/assets/icons/casa.png" alt="inicio" width="20" />
          Inicio
        </router-link>

        <router-link to="/specialty" class="menu-item">
          <img src="@/assets/icons/barbero.png" alt="especialidad" width="20" />
          Especialidades
        </router-link>

        <router-link to="/service" class="menu-item">
          <img src="@/assets/icons/barbero.png" alt="especialidad" width="20" />
          Servicios
        </router-link>

        <router-link to="/barber" class="menu-item">
          <img src="@/assets/icons/poste-de-barbero.png" alt="barberos" width="20" />
          Barberos
        </router-link>

        <router-link to="/user" class="menu-item">
          <img src="@/assets/icons/usuario.png" alt="usuario" width="20" />
          Usuarios
        </router-link>

        <router-link to="/appointment" class="menu-item">
          <img src="@/assets/icons/cita.png" alt="Cita" width="20" />
          Citas
        </router-link>

      </nav>

      <div class="logout-container">
        <button class="logout-btn" @click="logout">
          🚪 Cerrar Sesión
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

.sidebar {
  width: 260px;
  background: #212529;
  color: white;
  padding: 20px;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.menu-item {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.menu-item:hover {
  background: #343a40;
}

.logout-btn {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
}

.logout-btn:hover {
  color: #dc3545;
}



.content {
  flex: 1;
  padding: 20px;
  background: #f8f9fa;
}

.content-full {
  width: 100%;
}
</style>