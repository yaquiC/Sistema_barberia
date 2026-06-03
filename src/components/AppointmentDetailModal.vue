<script setup>
defineProps({
  appointment: Object
});
</script>

<template>
  <div
    class="modal fade"
    id="appointmentDetailModal"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div
        class="modal-content bg-slate-800 border border-slate-700 text-white"
        v-if="appointment"
      >

        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <h5 class="text-lg font-semibold text-white">
            Detalle de la Cita #{{ appointment.id }}
          </h5>

          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Body -->
        <div class="px-5 py-4">

          <div class="grid grid-cols-2 gap-y-4">

            <span class="font-semibold">Cliente:</span>
            <span>{{ appointment.user?.name }}</span>

            <span class="font-semibold">Barbero:</span>
            <span>{{ appointment.barber?.name }}</span>

            <span class="font-semibold">Fecha:</span>
            <span>{{ appointment.date }}</span>

            <span class="font-semibold">Hora:</span>
            <span>{{ appointment.time }}</span>

            <span class="font-semibold">Estado:</span>

            <div>
              <span
                v-if="appointment.status === 'en_proceso'"
                class="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-300"
              >
                En Proceso
              </span>

              <span
                v-else
                class="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-300"
              >
                Finalizada
              </span>
            </div>

            <div class="col-span-2">
              <span class="font-semibold">
                Servicios:
              </span>

              <ul class="mt-2">
                <li
                  v-for="detail in appointment.details"
                  :key="detail.id"
                >
                  • {{ detail.serviceName }} - ${{ detail.price }}
                </li>
              </ul>
            </div>

            <div class="col-span-2">
              <strong>Total:</strong>
              ${{ appointment.total }}
            </div>

          </div>

        </div>

        <!-- Footer -->
        <div class="flex justify-end border-t border-slate-700 px-4 py-3">
          <button
            class="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  </div>
</template>