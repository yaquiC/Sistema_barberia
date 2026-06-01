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
  <div
    class="modal fade"
    id="serviceModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            {{ form.id ? "Editar Servicio" : "Nuevo Servicio" }}
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <div class="modal-body">

          <div class="mb-3">
            <label class="form-label">
              Nombre
            </label>

            <input
              v-model="form.name"
              type="text"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Descripción
            </label>

            <textarea
              v-model="form.description"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">
              Precio
            </label>

            <input
              v-model="form.price"
              type="number"
              step="0.01"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Duración (minutos)
            </label>

            <input
              v-model="form.duration"
              type="number"
              class="form-control"
            />
          </div>

        </div>

        <div class="modal-footer">

          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            type="button"
            class="btn btn-primary"
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