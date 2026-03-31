//Componente de la lista de clientes.
//Muestra todos los clientes en una tabla y permite realizar las operaciones de editar y eliminar.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../clientes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-clientes-lista',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './clientes-lista.component.html',
    styleUrl: './clientes-lista.component.css'
})
export class ClientesListaComponent implements OnInit {

    // Variables del componente
    clientes_js: any[] = [];
    cargando_js: boolean = false;
    error_js: string = '';

    constructor(
        private clientesService: ClientesService,
        private authService: AuthService,
        private router: Router
    ) {}

    // Se ejecuta al cargar el componente
    ngOnInit() {
        this.cargarClientes();
    }

    // Obtener todos los clientes del backend
    cargarClientes() {
        this.cargando_js = true;
        this.error_js = '';

        this.clientesService.getClientes().subscribe({
            next: (respuesta_js: any) => {
                this.clientes_js = respuesta_js.clientes;
                this.cargando_js = false;
            },
            error: (err) => {
                this.cargando_js = false;
                this.error_js = err.error?.mensaje || 'Error al cargar los clientes.';
            }
        });
    }

    // Navegar al formulario de nuevo cliente
    nuevoCliente() {
        this.router.navigate(['/clientes/nuevo']);
    }

    // Navegar al formulario de edición
    editarCliente(id_js: number) {
        this.router.navigate(['/clientes/editar', id_js]);
    }

    // Eliminar un cliente
    eliminarCliente(id_js: number) {
        // Confirmamos antes de eliminar
        if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            this.clientesService.deleteCliente(id_js).subscribe({
                next: (respuesta_js: any) => {
                    if (respuesta_js.ok) {
                        // Recargamos la lista después de eliminar
                        this.cargarClientes();
                    }
                },
                error: (err) => {
                    this.error_js = err.error?.mensaje || 'Error al eliminar el cliente.';
                }
            });
        }
    }

    // Cerrar sesión
    cerrarSesion() {
        this.authService.logout().subscribe({
            next: () => {
                this.authService.eliminarSesion();
                this.router.navigate(['/login']);
            },
            error: () => {
                // Aunque falle el backend, eliminamos la sesión local
                this.authService.eliminarSesion();
                this.router.navigate(['/login']);
            }
        });
    }
}