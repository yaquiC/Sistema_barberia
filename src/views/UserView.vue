<script setup>
import { ref, onMounted } from "vue";

import UserModal from "../components/UserModal.vue";

import Swal from "sweetalert2";

import { UserPlus } from "lucide-vue-next";
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

    Swal.fire({
      icon: "success",
      title: "Usuario creado correctamente",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
    });

  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Error al crear usuario",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
    });
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

      <button @click="openCreateModal" data-bs-toggle="modal" data-bs-target="#userModal"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2">
        <UserPlus :size="18" />
        Agregar Usuario
      </button>
    </div>


    <div class="bg-[#151515] rounded-xl shadow-lg overflow-hidden border border-[#252525]">
      <table class="min-w-full">
        <thead class="bg-[#0F0F0F] text-white">
          <tr>
            <th class="px-6 py-4 text-left font-semibold">ID</th>
            <th class="px-6 py-4 text-left font-semibold">Nombre</th>
            <th class="px-6 py-4 text-left font-semibold">Correo</th>
            <th class="px-6 py-4 text-left font-semibold">Rol</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-700">
          <tr v-for="user in users" :key="user.id" class="hover:bg-slate-800 transition duration-200">
            <td class="px-6 py-4 text-slate-300">
              {{ user.id }}
            </td>

            <td class="px-6 py-4 font-medium text-white">
              {{ user.name }}
            </td>

            <td class="px-6 py-4 text-slate-400">
              {{ user.email }}
            </td>

            <td class="px-6 py-4">
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">
                {{ user.role }}
              </span>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="4" class="text-center py-6 text-slate-400">
              No hay usuarios registrados
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <UserModal @save="saveUser" />

  </div>
</template>