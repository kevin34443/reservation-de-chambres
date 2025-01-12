
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),
    providePrimeNG({ 
        theme: {
            preset: Aura
        }
    })
  

  ], 

};
