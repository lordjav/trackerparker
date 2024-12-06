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
        component: RegisterComponent
    },
    {
        path: 'parking-lot',
        component: ParkingLotComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
