<template>
  <!-- Formulario con validaciones utilizando Vuetify -->
  <v-form ref="form" v-model="valido" @submit.prevent="guardar">
    <!-- Campo de nombre: no acepta números ni símbolos -->
    <v-text-field
      label="Nombre"
      v-model="cliente.nombre"
      :rules="[rules.required, rules.nombre]"
    />
    <!-- Campo de correo con validación de formato -->
    <v-text-field
      label="Correo Electrónico"
      v-model="cliente.correo"
      :rules="[rules.required, rules.email]"
    />
    <!-- Campo de teléfono: solo números, mínimo 7 dígitos -->
    <v-text-field
      label="Teléfono"
      v-model="cliente.telefono"
      :rules="[rules.required, rules.telefono]"
    />
    <!-- Mensaje de error general si falla el guardado -->
    <v-alert v-if="error" type="error" class="my-2">
      {{ error }}
    </v-alert>
    <!-- Botón que solo se activa si el formulario es válido -->
    <v-btn color="primary" @click="guardar" :disabled="!valido">
      Guardar
    </v-btn>

    <v-btn @click="$router.push('/')">Cancelar</v-btn>
  </v-form>
</template>

<script setup>
// Importación de herramientas reactivas y rutas
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Props que indican si estamos editando y el cliente a editar
const props = defineProps({
  editar: Boolean,
  clienteProp: Object,
});

const store = useStore();
const router = useRouter();

// Si estamos editando, se carga el cliente a editar
const cliente = reactive({
  ...(props.clienteProp || {
    nombre: "",
    correo: "",
    telefono: "",
  }),
});

const valido = ref(false);
const form = ref(null);
const error = ref("");

// Reglas de validación
const rules = {
  required: (v) => !!v || "Este campo es obligatorio",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Correo inválido",
  nombre: (v) =>
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(v) ||
    "El nombre no puede tener números ni símbolos",
  telefono: (v) =>
    /^[0-9]{7,15}$/.test(v) ||
    "El teléfono debe tener solo números (7 a 15 dígitos)",
};

// Lógica para guardar o actualizar un cliente
function guardar() {
  error.value = "";

  // validacion del formulario antes de permitir guardar
  const esValido = form.value?.validate();

  if (!esValido) {
    error.value = "Por favor corrige los errores en el formulario.";
    return;
  }

  try {
    if (props.editar) {
      store.commit("actualizarCliente", { ...cliente });
    } else {
      store.commit("agregarCliente", { ...cliente });
    }

    // Redirecciona a la lista principal después de guardar
    router.push("/");
  } catch (err) {
    // Manejo de error inesperado
    error.value = "Ocurrió un error al guardar los datos.";
    console.error(err);
  }
}
</script>
