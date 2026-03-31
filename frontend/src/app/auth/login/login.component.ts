//Componente de la pantalla de inicio de sesión.
//Maneja el formulario de login y la comunicación con el AuthService para autenticar al usuario.


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    // Variables del formulario (mediante ngmodel)
    usuario_js: string = '';
    password_js: string = '';
    error_js: string = '';
    cargando_js: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    // Método que se ejecuta al hacer submit del formulario
    iniciarSesion() {
        // Verificar campos vacíos
        if (!this.usuario_js || !this.password_js) {
            this.error_js = 'Por favor completa todos los campos.';
            return;
        }

        // Activar indicador de carga
        this.cargando_js = true;
        this.error_js = '';

        // Llamar al servicio de autenticación
        this.authService.login(this.usuario_js, this.password_js).subscribe({
            next: (respuesta_js: any) => {
                if (respuesta_js.ok) {
                    // Guardamos la sesión y redirigimos a clientes
                    this.authService.guardarSesion(respuesta_js.usuario);
                    this.router.navigate(['/clientes']);
                }
            },
            error: (err) => {
                // Mostramos el mensaje de error del backend
                this.cargando_js = false;
                this.error_js = err.error?.mensaje || 'Credenciales incorrectas.';
            }
        });
    }
}