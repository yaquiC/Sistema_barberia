<script setup>
import { ref } from "vue";

const emit = defineEmits(["save"]);

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "CLIENTE",
});

const save = () => {
  emit("save", { ...form.value });

  form.value = {
    name: "",
    email: "",
    password: "",
    role: "CLIENTE",
  };
};
</script>

<template>
  <div class="modal fade" id="userModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white rounded-lg shadow-md border border-gray-200">

        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h5 class="text-lg font-semibold text-gray-800">
            Nuevo Usuario
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="grid grid-cols-2 gap-4 px-4 py-3">

          <!-- Nombre -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="form.name" type="text"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Nombre" />
          </div>

          <!-- Correo -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">Correo</label>
            <input v-model="form.email" type="email"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Correo" />
          </div>

          <!-- Contraseña -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
            <input v-model="form.password" type="password"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Contraseña" />
          </div>

          <!-- Rol -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">Rol</label>
            <select v-model="form.role"
              class="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
              <option value="GERENCIA">Gerencia</option>
              <option value="CLIENTE">Cliente</option>
            </select>
          </div>

        </div>

        <!-- Footer -->
        <div class="flex justify-end border-t border-gray-200 px-4 py-3 gap-3">
          
          <button type="button" data-bs-dismiss="modal"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-sm transition"
            @click="save">
            Guardar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
