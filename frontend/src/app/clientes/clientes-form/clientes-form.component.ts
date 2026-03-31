//Se usa tanto para crear nuevos clientes como para editar
//clientes existentes. Detecta el modo según si viene un
//ID en la URL o no.

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../clientes.service';

@Component({
    selector: 'app-clientes-form',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './clientes-form.component.html',
    styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit {

    // Variables del formulario
    id_js: number | null = null;
    nombre_js: string = '';
    correo_js: string = '';
    telefono_js: string = '';
    estatus_js: string = 'Activo';
    error_js: string = '';
    cargando_js: boolean = false;

    // Para saber si estamos editando o creando
    esEdicion_js: boolean = false;

    constructor(
        private clientesService: ClientesService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    // Se ejecuta al cargar el componente
    ngOnInit() {
        // Verificamos si viene un ID en la URL (modo edición)
        var id_param = this.route.snapshot.paramMap.get('id');

        if (id_param) {
            // Modo edición
            this.esEdicion_js = true;
            this.id_js = Number(id_param);
            this.cargarCliente(this.id_js);
        }
    }

    // Cargar datos del cliente a editar
    cargarCliente(id_js: number) {
        this.cargando_js = true;

        this.clientesService.getClienteById(id_js).subscribe({
            next: (respuesta_js: any) => {
                // Llenamos el formulario con los datos del cliente
                var cliente_js = respuesta_js.cliente;
                this.nombre_js   = cliente_js.nombre;
                this.correo_js   = cliente_js.correo;
                this.telefono_js = cliente_js.telefono;
                this.estatus_js  = cliente_js.estatus;
                this.cargando_js = false;
            },
            error: (err) => {
                this.cargando_js = false;
                this.error_js = err.error?.mensaje || 'Error al cargar el cliente.';
            }
        });
    }

    // Guardar cliente (crear o editar)
    guardarCliente() {
        // Verificar campos vacíos
        if (!this.nombre_js || !this.correo_js || !this.telefono_js || !this.estatus_js) {
            this.error_js = 'Por favor completa todos los campos.';
            return;
        }

        // Armamos el objeto con los datos del formulario
        var datos_js = {
            nombre:   this.nombre_js,
            correo:   this.correo_js,
            telefono: this.telefono_js,
            estatus:  this.estatus_js
        };

        this.cargando_js = true;
        this.error_js = '';

        if (this.esEdicion_js && this.id_js) {
            // Modo edición → PUT
            this.clientesService.updateCliente(this.id_js, datos_js).subscribe({
                next: (respuesta_js: any) => {
                    if (respuesta_js.ok) {
                        // Regresamos a la lista después de editar
                        this.router.navigate(['/clientes']);
                    }
                },
                error: (err) => {
                    this.cargando_js = false;
                    this.error_js = err.error?.mensaje || 'Error al actualizar el cliente.';
                }
            });
        } else {
            // Modo creación → POST
            this.clientesService.createCliente(datos_js).subscribe({
                next: (respuesta_js: any) => {
                    if (respuesta_js.ok) {
                        // Regresamos a la lista después de crear
                        this.router.navigate(['/clientes']);
                    }
                },
                error: (err) => {
                    this.cargando_js = false;
                    this.error_js = err.error?.mensaje || 'Error al crear el cliente.';
                }
            });
        }
    }

    // Cancelar y regresar a la lista
    cancelar() {
        this.router.navigate(['/clientes']);
    }
}