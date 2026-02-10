import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]), // if you have routes, put them here
    provideAnimations(),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      NgxChartsModule
    ),
  ],
};
