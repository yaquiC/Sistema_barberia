<script setup>
import { ref, onMounted } from "vue";

import UserModal from "../components/UserModal.vue";

import{UserPlus} from "lucide-vue-next";
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
      @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#userModal"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        <UserPlus :size="18" />
        Agregar Usuario
      </button>
    </div>


    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-slate-800 text-white">
          <tr>
            <th class="px-6 py-4 text-left font-semibold">ID</th>
            <th class="px-6 py-4 text-left font-semibold">Nombre</th>
            <th class="px-6 py-4 text-left font-semibold">Correo</th>
            <th class="px-6 py-4 text-left font-semibold">Rol</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition duration-200">
            <td class="px-6 py-4 text-gray-700">
              {{ user.id }}
            </td>

            <td class="px-6 py-4 font-medium text-gray-900">
              {{ user.name }}
            </td>

            <td class="px-6 py-4 text-gray-600">
              {{ user.email }}
            </td>

            <td class="px-6 py-4">
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {{ user.role }}
              </span>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="4" class="text-center py-6 text-gray-500">
              No hay usuarios registrados
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <UserModal @save="saveUser" />

  </div>
</template>