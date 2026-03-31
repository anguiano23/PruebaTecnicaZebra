//Punto de entrtrada principal de Angular.
// Se encarga de inicializar la aplicación con la configuración, definida en app.config.ts.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// Iniciamos la aplicación Angular con el componente raíz y su configuración
bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));