import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BarberView from "@/views/BarberView.vue";
import UserView from "@/views/UserView.vue";
import AppointmentView from "@/views/AppointmentView.vue";
import AppointmentFormView from "@/views/AppointmentFormView.vue";
import LoginView from "../views/LoginView.vue";
import SpecialtyView from "@/views/SpecialtyView.vue";
import ServiceView from "@/views/ServiceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/specialty",
      name: "especialidad",
      component: SpecialtyView,
    },
    {
      path: "/service",
      name: "servicio",
      component: ServiceView,
    },

    {
      path: "/barber",
      name: "barberos",
      component: BarberView,
    },
    {
      path: "/user",
      name: "usuario",
      component: UserView,
    },
    {
      path: "/appointment",
      name: "citas",
      component: AppointmentView,
    },
    {
      path: "/appointment/create",
      name: "crear-cita",
      component: AppointmentFormView,
    },
    {
      path: "/appointment/edit/:id",
      name: "editar-cita",
      component: AppointmentFormView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
