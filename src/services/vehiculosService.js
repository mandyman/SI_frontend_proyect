import clienteREST from "./clienteREST";

class vehiculosService {
  buscarTodos() {
    return clienteREST.get("/vehiculo");
  }

  buscarPorId(id) {
    return clienteREST.get(`/vehiculo/${id}`);
  }

  crear(data) {
    return clienteREST.post("/vehiculo", data);
  }

  modificar(id, data) {
    return clienteREST.put(`/vehiculo/${id}`, data);
  }

  eliminar(id) {
    return clienteREST.delete(`/vehiculo/${id}`);
  }

  buscarPorModelo(modelo) {
    return clienteREST.get(`/vehiculo?modelo=${modelo}`);
  }

  buscarPorMatricula(matricula) {
    return clienteREST.get(`/vehiculo?matricula=${matricula}`);
  }

  buscarPorConductorId(conductorId) {
    return clienteREST.get(`/vehiculo?conductorId=${conductorId}`);
  }
}

export default new vehiculosService();