<template>
  <v-data-table :headers="headers" :items="clientes" class="elevation-1">
    <template #top>
      <v-btn color="primary" @click="$router.push('/agregar')"
        >Agregar Cliente</v-btn
      >
    </template>

    <template #[`item.acciones`]="{ item }">
      <v-btn icon @click="$router.push(`/editar/${item.id}`)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="eliminar(item.id)">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const clientes = computed(() => store.state.clientes);

const headers = [
  { text: "Nombre", value: "nombre" },
  { text: "Correo", value: "correo" },
  { text: "Teléfono", value: "telefono" },
  { text: "Acciones", value: "acciones", sortable: false },
];

function eliminar(id) {
  if (confirm("¿Estás seguro de eliminar este cliente?")) {
    store.commit("eliminarCliente", id);
  }
}
</script>
