import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import BarberView from "@/views/BarberView.vue";
import UserView from "@/views/UserView.vue";
import AppointmentView from "@/views/AppointmentView.vue";
import LoginView from "../views/LoginView.vue";
import SpecialtyView from "@/views/SpecialtyView.vue";

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
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
