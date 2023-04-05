import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { HomeComponent } from './home/home.component';

import { MainComponent } from './main/main.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'main',
    component: MainComponent,
    children:[
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
            {
            path: 'home',
            component: HomeComponent,
            // canActivate: [AuthGuard]
          },
        
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class MainRoutingModule { }