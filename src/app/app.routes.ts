import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BookingComponent } from './components/booking/booking.component';
import { ListbookingComponent } from './components/listbooking/listbooking.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch :'full',
    },
    {
        path:'login',component: LoginComponent,
    
    },
    {
        path:'booking',component: BookingComponent,
    },
    {
        path:'listbookings',component: ListbookingComponent, 
    }
];
