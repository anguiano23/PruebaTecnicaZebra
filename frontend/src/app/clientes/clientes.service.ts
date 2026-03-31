//Servicio del CRUD de clientes.
//Se encarga de la comunicación con todos los endpoints de clientes del backend mediante HttpClient

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    // URL base del backend
    private url_api = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    // GET /clientes → Obtener todos los clientes
    getClientes() {
        return this.http.get(`${this.url_api}/clientes`, {
            withCredentials: true
        });
    }

    // GET /clientes/:id → Obtener un cliente por ID
    getClienteById(id_js: number) {
        return this.http.get(`${this.url_api}/clientes/${id_js}`, {
            withCredentials: true
        });
    }

    // POST /clientes → Crear un nuevo cliente
    createCliente(cliente_js: any) {
        return this.http.post(`${this.url_api}/clientes`, cliente_js, {
            withCredentials: true
        });
    }

    // PUT /clientes/:id → Actualizar un cliente
    updateCliente(id_js: number, cliente_js: any) {
        return this.http.put(`${this.url_api}/clientes/${id_js}`, cliente_js, {
            withCredentials: true
        });
    }

    // DELETE /clientes/:id → Eliminar un cliente
    deleteCliente(id_js: number) {
        return this.http.delete(`${this.url_api}/clientes/${id_js}`, {
            withCredentials: true
        });
    }
}