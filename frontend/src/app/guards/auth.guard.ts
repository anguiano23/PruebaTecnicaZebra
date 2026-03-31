//Protege las rutas privadas verificando si el usuario tiene una sesión activa antes de permitir el acceso.
//Si no tiene sesión, redirige al login.

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    // Inyectamos los servicios necesarios
    var router = inject(Router);
    var authService = inject(AuthService);

    // Verificamos si el usuario tiene sesión activa
    if (authService.estaAutenticado()) {
        return true; // Tiene sesión, dejamos pasar
    } else {
        // No tiene sesión, redirigimos al login
        router.navigate(['/login']);
        return false;
    }
};