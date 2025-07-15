<template>
  <ClienteForm :cliente-prop="cliente" :editar="true" />
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import ClienteForm from "../components/ClienteForm.vue";

const route = useRoute();
const store = useStore();
const cliente = computed(() =>
  store.getters.obtenerCliente(Number(route.params.id))
);
</script>
