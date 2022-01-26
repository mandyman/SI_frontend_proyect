import clienteREST from "./clienteREST";

class accidentesService {
  buscarTodos() {
    return clienteREST.get("/accidente");
  }

  buscarPorId(id) {
    return clienteREST.get(`/accidente/${id}`);
  }

  crear(data) {
    return clienteREST.post("/accidente", data);
  }

  modificar(id, data) {
    return clienteREST.put(`/accidente/${id}`, data);
  }

  eliminar(id) {
    return clienteREST.delete(`/accidente/${id}`);
  }

  buscarPorProvincia(provincia) {
    return clienteREST.get(`/accidente?provincia=${provincia}`);
  }

  buscarPorCodigoPostal(codigoPostal) {
    return clienteREST.get(`/accidente?codigoPostal=${codigoPostal}`);
  }

  buscarPorDescripcion(descripcion) {
    return clienteREST.get(`/accidente?descripcion=${descripcion}`);
  }
}

export default new accidentesService();