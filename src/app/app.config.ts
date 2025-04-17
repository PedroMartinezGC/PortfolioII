import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
	new TranslateHttpLoader(http, './assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(withFetch()),
		importProvidersFrom([TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient],
			},
		})])
	]
};
