<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  service: Object,
});

const emit = defineEmits(["save"]);

const form = ref({
  id: null,
  name: "",
  description: "",
  price: "",
  duration: "",
});

watch(
  () => props.service,
  (newValue) => {
    if (newValue) {
      form.value = {
        id: newValue.id,
        name: newValue.name,
        description: newValue.description,
        price: newValue.price,
        duration: newValue.duration,
      };
    } else {
      form.value = {
        id: null,
        name: "",
        description: "",
        price: "",
        duration: "",
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
    description: "",
    price: "",
    duration: "",
  };
};
</script>

<template>
  <div class="modal fade" id="serviceModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-white rounded-2xl shadow-xl border border-gray-200">

        <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h5 class="text-xl font-semibold text-gray-800">
            {{ form.id ? "Editar Servicio" : "Nuevo Servicio" }}
          </h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="grid grid-cols-2 gap-5 px-5 py-4">

          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Nombre
            </label>

            <input v-model="form.name" type="text"
              class="w-full px-2 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />

          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Precio
            </label>

            <input v-model="form.price" type="number" step="0.01"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
          </div>

          <div class="col-span-2 sm:col-span-1">
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Duración (minutos)
            </label>

            <input v-model="form.duration" type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
          </div>

          <div class="col-span-2">
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Descripción
            </label>

            <textarea v-model="form.description"
             class="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
             placeholder="Describe el servicio..."></textarea>
          </div>

        </div>

        <div class="flex items-center gap-4 border-t border-gray-200 px-3 py-4">

          <button type="button"
            data-bs-dismiss="modal"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl shadow-sm transition"
            @click="save">
            Guardar
          </button>

        </div>

      </div>
    </div>
  </div>
</template>