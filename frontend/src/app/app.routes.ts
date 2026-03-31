//Establece qué componente se muestra en cada URL, y qué rutas requieren autenticación.


import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Ruta por defecto → redirige al login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Ruta de login → pública
    { path: 'login', component: LoginComponent },

    // Rutas de clientes → protegidas por authGuard
    { path: 'clientes', component: ClientesListaComponent, canActivate: [authGuard] },
    { path: 'clientes/nuevo', component: ClientesFormComponent, canActivate: [authGuard] },
    { path: 'clientes/editar/:id', component: ClientesFormComponent, canActivate: [authGuard] },

    // Cualquier ruta desconocida → redirige al login
    { path: '**', redirectTo: 'login' }
];