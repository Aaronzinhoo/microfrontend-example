import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // Your route here:

  {
    path: 'flights',
    loadChildren: () => import('mfe1/Module').then((m) => m.FlightsModule),
  },
  {
    path: 'experimental',
    loadComponent: () =>
      import('experimental/Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
