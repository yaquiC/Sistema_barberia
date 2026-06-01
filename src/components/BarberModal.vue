<script setup>
import { ref, watch, onMounted } from "vue";
import { getSpecialties } from "../services/SpecialtyService";

const props = defineProps({
  barber: Object,
});

const emit = defineEmits(["save"]);

const specialties = ref([]);

const form = ref({
  id: null,
  name: "",
  specialtyId: "",
});

const loadSpecialties = async () => {
  const response = await getSpecialties();
  specialties.value = response.data;
};

watch(
  () => props.barber,
  (newValue) => {
    if (newValue) {
      form.value = {
        id: newValue.id,
        name: newValue.name,
        specialtyId: newValue.specialty?.id,
      };
    } else {
      form.value = {
        id: null,
        name: "",
        specialtyId: "",
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
    specialtyId: "",
  };
};

onMounted(() => {
  loadSpecialties();
});
</script>

<template>
  <div
    class="modal fade"
    id="barberModal"
    tabindex="-1"
  >
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title">
            {{ form.id ? "Editar Barbero" : "Nuevo Barbero" }}
          </h5>
        </div>

        <div class="modal-body">

          <div class="mb-3">
            <label class="form-label">
              Nombre
            </label>

            <input
              v-model="form.name"
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">
              Especialidad
            </label>

            <select
              v-model="form.specialtyId"
              class="form-select"
            >
              <option value="">
                Seleccione una especialidad
              </option>

              <option
                v-for="specialty in specialties"
                :key="specialty.id"
                :value="specialty.id"
              >
                {{ specialty.name }}
              </option>
            </select>
          </div>

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