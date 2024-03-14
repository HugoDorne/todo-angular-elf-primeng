import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { devTools } from '@ngneat/elf-devtools';

devTools();

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
