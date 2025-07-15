import { createStore } from "vuex";

export default createStore({
  state: {
    // Lista de clientes simulando persistencia
    clientes: [],
  },
  mutations: {
    // Agrega un nuevo cliente al estado
    agregarCliente(state, cliente) {
      cliente.id = Date.now(); // Generar ID único
      state.clientes.push(cliente);
    },

    // Actualiza un cliente existente por su ID
    actualizarCliente(state, clienteActualizado) {
      const index = state.clientes.findIndex(
        (c) => c.id === clienteActualizado.id
      );
      if (index !== -1) {
        state.clientes[index] = clienteActualizado;
      }
    },

    // Elimina un cliente del estado por su ID
    eliminarCliente(state, id) {
      state.clientes = state.clientes.filter((c) => c.id !== id);
    },
  },
  getters: {
    // Obtiene cliente por ID para edición
    obtenerCliente: (state) => (id) => {
      return state.clientes.find((c) => c.id === id);
    },
  },
});
