// Aquí se registran los providers globales como el router, y el cliente HTTP.


import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        // Optimización de detección de cambios
        provideZoneChangeDetection({ eventCoalescing: true }),
        // Registramos las rutas de la aplicación
        provideRouter(routes),
        // Habilitamos el cliente HTTP para consumir la API
        provideHttpClient() 
    ]
};