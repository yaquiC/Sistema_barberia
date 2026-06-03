<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import { getUsers } from "../services/UserService";
import { getBarbers } from "../services/barberService";
import { getServices } from "../services/ServiceService";

import { createAppointment } from "../services/AppointmentService";

const router = useRouter();

const users = ref([]);
const barbers = ref([]);
const services = ref([]);

const form = ref({
  userId: "",
  barberId: "",
  date: "",
  time: "",
  status: "en_proceso",
  services: [],
});

const total = computed(() => {
  return form.value.services.reduce(
    (sum, service) => sum + Number(service.price),
    0
  );
});

const loadData = async () => {
  try {
    const usersResponse = await getUsers();
    users.value = usersResponse.data;

    const barbersResponse = await getBarbers();
    barbers.value = barbersResponse.data;

    const servicesResponse = await getServices();
    services.value = servicesResponse.data;
  } catch (error) {
    console.error(error);
  }
};

const saveAppointment = async () => {
  try {
    const payload = {
      userId: Number(form.value.userId),
      barberId: Number(form.value.barberId),
      date: form.value.date,
      time: form.value.time,
      status: form.value.status,

      services: form.value.services.map(
        service => service.id
      ),
    };

    await createAppointment(payload);

    router.push("/appointment");

  } catch (error) {
    console.error(error);
    alert("Error al crear la cita");
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="container mt-4">

    <div class="card shadow">

      <div class="card-header">
        <h3>Nueva Cita</h3>
      </div>

      <div class="card-body">

        <form @submit.prevent="saveAppointment">

          <div class="row">

            <!-- Usuario -->
            <div class="col-md-6 mb-3">
              <label class="form-label">
                Cliente
              </label>

              <select
                v-model="form.userId"
                class="form-select"
                required
              >
                <option value="">
                  Seleccione un cliente
                </option>

                <option
                  v-for="user in users"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
            </div>

            <!-- Barbero -->
            <div class="col-md-6 mb-3">
              <label class="form-label">
                Barbero
              </label>

              <select
                v-model="form.barberId"
                class="form-select"
                required
              >
                <option value="">
                  Seleccione un barbero
                </option>

                <option
                  v-for="barber in barbers"
                  :key="barber.id"
                  :value="barber.id"
                >
                  {{ barber.name }}
                </option>
              </select>
            </div>

            <!-- Fecha -->
            <div class="col-md-6 mb-3">
              <label class="form-label">
                Fecha
              </label>

              <input
                type="date"
                v-model="form.date"
                class="form-control"
                required
              />
            </div>

            <!-- Hora -->
            <div class="col-md-6 mb-3">
              <label class="form-label">
                Hora
              </label>

              <input
                type="time"
                v-model="form.time"
                class="form-control"
                required
              />
            </div>

            <!-- Estado -->
            <div class="col-md-6 mb-3">
              <label class="form-label">
                Estado
              </label>

              <select
                v-model="form.status"
                class="form-select"
              >
                <option value="en_proceso">
                  En Proceso
                </option>

                <option value="finalizada">
                  Finalizada
                </option>
              </select>
            </div>

            <!-- Servicios -->
            <div class="col-md-12 mb-3">

              <label class="form-label">
                Servicios
              </label>

              <div class="row">

                <div
                  class="col-md-4 mb-2"
                  v-for="service in services"
                  :key="service.id"
                >
                  <div class="form-check border rounded p-2">

                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="service"
                      v-model="form.services"
                      :id="`service-${service.id}`"
                    >

                    <label
                      class="form-check-label ms-2"
                      :for="`service-${service.id}`"
                    >
                      {{ service.name }}
                      <br>
                      <small>
                        ${{ service.price }}
                      </small>
                    </label>

                  </div>
                </div>

              </div>

            </div>

            <!-- Total -->
            <div class="col-md-12 mb-4">

              <div class="alert alert-info">
                <strong>Total:</strong>
                ${{ total.toFixed(2) }}
              </div>

            </div>

          </div>

          <div class="d-flex justify-content-end gap-2">

            <button
              type="button"
              class="btn btn-secondary"
              @click="router.push('/appointment')"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="btn btn-primary"
            >
              Guardar Cita
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>