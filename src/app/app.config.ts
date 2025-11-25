import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './component/shared/http-loader.factory';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration:'top'})),
      provideAnimations(), 
      provideHttpClient(), 
      provideTransloco({
        config: { 
          availableLangs: ['en', 'es'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
      importProvidersFrom(
        TranslateModule.forRoot({
          loader:{
            provide:TranslateLoader,
            useFactory:HttpLoaderFactory,
            deps:[HttpClient]
          }
        })
      )
    
    ]
};
