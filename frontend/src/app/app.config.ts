import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { defineParkingInterceptor } from './define-parking.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(
      withFetch(),
      withInterceptors([defineParkingInterceptor])
    ),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync()
  ]
};
