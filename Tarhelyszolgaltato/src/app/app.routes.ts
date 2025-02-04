import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ServicesComponent } from './components/services/services.component';
import { MeComponent } from './components/me/me.component';
import { AdminAuthGuard } from './components/guards/admin-auth.guard';
import { AdminServicesListComponent } from './components/admin-services-list/admin-services-list.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';

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
    },
    

    {
        path:'admin', canActivate: [AdminAuthGuard],
        children: [
            {
                path:'service', component:AdminServicesListComponent
            },
            {
                path:'users', component:AdminUserListComponent
            }
        ]
    }

];


