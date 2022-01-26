import clienteREST from "./clienteREST";

class personasService {
  buscarTodos() {
    return clienteREST.get("/persona");
  }

  buscarPorId(id) {
    return clienteREST.get(`/persona/${id}`);
  }

  crear(data) {
    return clienteREST.post("/persona", data);
  }

  modificar(id, data) {
    return clienteREST.put(`/persona/${id}`, data);
  }

  eliminar(id) {
    return clienteREST.delete(`/persona/${id}`);
  }

  buscarPorNombre(nombre) {
    return clienteREST.get(`/persona?nombre=${nombre}`);
  }

  buscarPorApellidos(apellidos) {
    return clienteREST.get(`/persona?apellidos=${apellidos}`);
  }

  buscarPorDNI(dni) {
    return clienteREST.get(`/persona?dni=${dni}`);
  }
}

export default new personasService();