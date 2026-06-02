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
  <section class="vh-100 login-background">
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

              <h2 class="text-center mb-4" style="color: white;">
                 Legen Barber
              </h2>
              <h5 class="text-center " style="color: white;">Inica sesion</h5>

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
.login-background {
  position: relative;
  background-image: url("/images/fondo.png"); /* coloca tu imagen en public/images */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5); /* oscurece la imagen */
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.1); /* semitransparente */
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0,0,0,.3);
  backdrop-filter: blur(10px); /* difumina el fondo detrás */
}

.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: none;
}


</style>