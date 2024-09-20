import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { examInterceptor } from './exam.interceptor';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provides router configuration based on your routes
    provideClientHydration(),
    provideHttpClient(withInterceptors([examInterceptor])),
    provideHttpClient(withFetch()), 
    BrowserAnimationsModule, 
    provideAnimations(), // required animations providers
    provideToastr(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Disable auto-login
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('982133624088-prs1839p8svnl5kgi837vr2eqjoj6md4.apps.googleusercontent.com'), // Replace with your Google Client ID
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
};

function BrowserAnimationmodule(): import('@angular/core').Provider | import('@angular/core').EnvironmentProviders {
  throw new Error('Function not implemented.');
}
