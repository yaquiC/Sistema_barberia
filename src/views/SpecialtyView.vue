<script setup>
import { ref, onMounted } from "vue";

import {
  getSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "../services/SpecialtyService";

const specialties = ref([]);

const specialtyId = ref(null);
const name = ref("");
const isEditing = ref(false);

const loadSpecialties = async () => {
  try {
    const response = await getSpecialties();
    specialties.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  specialtyId.value = null;
  name.value = "";
};

const openEditModal = (specialty) => {
  isEditing.value = true;
  specialtyId.value = specialty.id;
  name.value = specialty.name;
};

const saveOrUpdate = async () => {
  if (!name.value.trim()) {
    alert("Ingrese un nombre");
    return;
  }

  try {
    if (isEditing.value) {
      await updateSpecialty(specialtyId.value, {
        name: name.value,
      });
    } else {
      await createSpecialty({
        name: name.value,
      });
    }

    await loadSpecialties();

    specialtyId.value = null;
    name.value = "";
    isEditing.value = false;
  } catch (error) {
    console.error(error);
  }
};

const removeSpecialty = async (id) => {
  if (!confirm("¿Eliminar especialidad?")) return;

  try {
    await deleteSpecialty(id);
    await loadSpecialties();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadSpecialties();
});
</script>

<template>
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Especialidades</h2>

      <button
        class="btn btn-primary"
        @click="openCreateModal"
        data-bs-toggle="modal"
        data-bs-target="#specialtyModal"
      >
        + Nueva Especialidad
      </button>
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th width="180">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="specialty in specialties"
          :key="specialty.id"
        >
          <td>{{ specialty.id }}</td>
          <td>{{ specialty.name }}</td>

          <td>
            <button
              class="btn btn-success btn-sm me-2"
              @click="openEditModal(specialty)"
              data-bs-toggle="modal"
              data-bs-target="#specialtyModal"
            >
              Editar
            </button>

            <button
              class="btn btn-danger btn-sm"
              @click="removeSpecialty(specialty.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear / Editar -->
    <div
      class="modal fade"
      id="specialtyModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">
              {{
                isEditing
                  ? "Editar Especialidad"
                  : "Nueva Especialidad"
              }}
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <label class="form-label">
              Nombre
            </label>

            <input
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Nombre de especialidad"
            />
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
              @click="saveOrUpdate"
              data-bs-dismiss="modal"
            >
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>