import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddClienteView from "../views/AddClienteView.vue";
import EditClienteView from "../views/EditClienteView.vue";

const routes = [
  // Vista principal: muestra la lista de clientes
  { path: "/", name: "Home", component: HomeView },
  // Vista de formulario para agregar nuevo cliente
  { path: "/agregar", name: "Agregar", component: AddClienteView },
  // Vista de formulario para editar cliente, pasando el ID como prop
  {
    path: "/editar/:id",
    name: "Editar",
    component: EditClienteView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
