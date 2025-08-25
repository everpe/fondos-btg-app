import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(), // required animations providers
    provideToastr(
      {
      timeOut: 3000, // duración en ms
      positionClass: 'toast-bottom-right',
      preventDuplicates: true, // opcional: evita toasts repetidos
      closeButton: true        // opcional: botón de cerrar
    }
    ), // Toastr providers
  ],
};


