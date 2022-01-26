import clienteREST from "./clienteREST";

class multasService {
  buscarTodos() {
    return clienteREST.get("/multa");
  }

  buscarPorId(id) {
    return clienteREST.get(`/multa/${id}`);
  }

  crear(data) {
    return clienteREST.post("/multa", data);
  }

  modificar(id, data) {
    return clienteREST.put(`/multa/${id}`, data);
  }

  eliminar(id) {
    return clienteREST.delete(`/multa/${id}`);
  }

  buscarPorTipo(tipo) {
    return clienteREST.get(`/multa?tipo=${tipo}`);
  }

  buscarPorSancion(sancion) {
    return clienteREST.get(`/multa?sancion=${sancion}`);
  }

  buscarPorAccidenteId(accidenteId) {
    return clienteREST.get(`/multa?accidenteId=${accidenteId}`);
  }
}

export default new multasService();