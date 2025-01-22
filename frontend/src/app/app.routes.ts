import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Registrar'
    },
    {
        path: 'parking-lot/:id',
        component: ParkingLotComponent,
        title: 'Parqueadero'
    },
    {
        path: 'parking-lot',
        component: ParkingLotComponent,
        title: 'Parqueadero'
    },
    {
        path: 'history',
        component: HistoryComponent,
        title: 'Historial'
    },
    {
        path: 'settings',
        component: SettingsComponent,
        title: 'Ajustes'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Tracker Parker'
    },
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        title: 'Error'
    }
];
