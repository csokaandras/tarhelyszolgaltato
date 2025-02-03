import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ServicesComponent } from './components/services/services.component';
import { MeComponent } from './components/me/me.component';

export const routes: Routes = [

    {
        path:'login', component:LoginComponent
    },
    {
        path:'register', component:RegistrationComponent
    },
    {
        path:'service', component:ServicesComponent
    },
    {
        path:'me', component:MeComponent
    }
    


];


