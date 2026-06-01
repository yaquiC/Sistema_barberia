<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/AuthService";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    const response = await login(
      email.value,
      password.value
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    router.push("/");
  } catch (error) {
    error.value = "Correo o contraseña incorrectos";
  }
};
</script>

<template>
  <section class="vh-100 bg-black">
    <div class="container py-5 h-100">
      <div
        class="row d-flex justify-content-center align-items-center h-100"
      >
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            class="card shadow"
            style="border-radius: 1rem;"
          >
            <div class="card-body p-5">

              <h2 class="text-center mb-4">
                 Legen Barber
              </h2>

              <div
                v-if="error"
                class="alert alert-danger"
              >
                {{ error }}
              </div>

              <div class="mb-4">
                <label class="form-label">
                  Correo
                </label>

                <input
                  v-model="email"
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div class="mb-4">
                <label class="form-label">
                  Contraseña
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="********"
                />
              </div>

              <button
                @click="handleLogin"
                class="btn btn-primary btn-lg w-100"
              >
                Iniciar Sesión
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #080808;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,0,0,.2);
}
</style>