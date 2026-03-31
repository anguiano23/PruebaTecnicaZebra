//Se encarga de la comunicación con los endpoints de autenticación  del backend y del manejo de la sesión en localStorage

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // URL base del backend
    private url_api = 'http://localhost:3000';

    constructor(private http: HttpClient, private router: Router) {}

    // Iniciar sesión contra el backend
    login(usuario: string, password: string) {
        var datos_js = { usuario, password };
        return this.http.post(`${this.url_api}/auth/login`, datos_js, {
            withCredentials: true // Necesario para enviar/recibir cookies de sesión
        });
    }

    // Cerrar sesión contra el backend
    logout() {
        return this.http.post(`${this.url_api}/auth/logout`, {}, {
            withCredentials: true
        });
    }

    // Guardar sesión en localStorage
    guardarSesion(usuario: any) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    // Eliminar sesión de localStorage
    eliminarSesion() {
        localStorage.removeItem('usuario');
    }

    // Verificar si el usuario tiene sesión activa
    estaAutenticado(): boolean {
        var usuario_js = localStorage.getItem('usuario');
        return usuario_js !== null;
    }

    // Obtener usuario de localStorage
    getUsuario() {
        var usuario_js = localStorage.getItem('usuario');
        return usuario_js ? JSON.parse(usuario_js) : null;
    }
}