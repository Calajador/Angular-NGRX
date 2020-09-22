import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GashboardComponent } from './gashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
        path: '',
        component: GashboardComponent,
        children: dashboardRoutes,
        // canActivate: [ AuthGuardService ]
    }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboarsRoutesModule { }
