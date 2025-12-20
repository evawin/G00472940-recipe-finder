import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { addIcons } from 'ionicons';
import { heart, settings } from 'ionicons/icons';



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      IonicModule.forRoot(),
      HttpClientModule
    )
  ]
}).catch(err => console.error(err));
