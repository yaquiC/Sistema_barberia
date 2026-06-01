<script setup>
import { ref, onMounted } from "vue";

import UserModal from "../components/UserModal.vue";

import {
  getUsers,
  createUser,
} from "../services/UserService";

const users = ref([]);

const loadUsers = async () => {
  try {
    const response = await getUsers();
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const saveUser = async (data) => {
  try {
    await createUser(data);

    await loadUsers();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between mb-4">
      <h2>Usuarios</h2>

      <button
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
      >
        Nuevo Usuario
      </button>
    </div>

    <div class="card">
      <div class="card-body">

        <table class="table">

          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>

    <UserModal @save="saveUser" />

  </div>
</template>