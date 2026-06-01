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
  <div
    class="modal fade"
    id="userModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            Nuevo Usuario
          </h5>
        </div>

        <div class="modal-body">

          <input
            v-model="form.name"
            class="form-control mb-3"
            placeholder="Nombre"
          />

          <input
            v-model="form.email"
            type="email"
            class="form-control mb-3"
            placeholder="Correo"
          />

          <input
            v-model="form.password"
            type="password"
            class="form-control mb-3"
            placeholder="Contraseña"
          />

          <select
            v-model="form.role"
            class="form-select"
          >
            <option value="gerencia">
              Gerencia
            </option>

            <option value="cliente">
              Cliente
            </option>
          </select>

        </div>

        <div class="modal-footer">

          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar
          </button>

          <button
            class="btn btn-primary"
            @click="save"
            data-bs-dismiss="modal"
          >
            Guardar
          </button>

        </div>

      </div>
    </div>
  </div>
</template>