<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  barber: Object,
});

const emit = defineEmits(["save"]);

const form = ref({
  id: null,
  name: "",
});

watch(
  () => props.barber,
  (newValue) => {
    if (newValue) {
      form.value = {
        id: newValue.id,
        name: newValue.name,
      };
    } else {
      form.value = {
        id: null,
        name: "",
      };
    }
  },
  { immediate: true }
);

const save = () => {
  emit("save", { ...form.value });

  form.value = {
    id: null,
    name: "",
  };
};
</script>

<template>
  <div class="modal fade" id="barberModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-gray-900 border border-gray-700 text-white rounded-lg shadow-lg">

        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-700 px-4 py-3">
          <h5 class="text-lg font-semibold text-white">
            {{ form.id ? "Editar Barbero" : "Nuevo Barbero" }}
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
              class="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

        </div>

        <!-- Footer -->
        <div class="flex justify-end border-t border-gray-700 px-4 py-3 gap-3">

          <button
            type="button"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            data-bs-dismiss="modal"
            @click="save"
          >
            Guardar
          </button>

        </div>

      </div>
    </div>
  </div>
</template>