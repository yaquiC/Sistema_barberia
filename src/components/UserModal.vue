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
      <div class="modal-content bg-gray-900 border border-gray-700 text-white rounded-lg shadow-lg">

        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
          <h5 class="text-lg font-semibold text-white">
            Nuevo Usuario
          </h5>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Body -->
        <div class="grid grid-cols-2 gap-4 px-4 py-4">

          <!-- Nombre -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-300">
              Nombre
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Nombre"
              class="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <!-- Correo -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-300">
              Correo
            </label>

            <input
              v-model="form.email"
              type="email"
              placeholder="Correo"
              class="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <!-- Contraseña -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-300">
              Contraseña
            </label>

            <input
              v-model="form.password"
              type="password"
              placeholder="Contraseña"
              class="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <!-- Rol -->
          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-300">
              Rol
            </label>

            <select
              v-model="form.role"
              class="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="gerencia">Gerencia</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>

        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 border-t border-gray-700 px-4 py-3">

          <button
            type="button"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            type="button"
            data-bs-dismiss="modal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            @click="save"
          >
            Guardar
          </button>

        </div>

      </div>
    </div>
  </div>
</template>
