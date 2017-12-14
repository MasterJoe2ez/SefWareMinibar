import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {ReportsComponent} from './main/reports/reports.component';
import {HomeComponent} from './main/home/home.component';
import {ItemsComponent} from './main/items/items.component';
import {UsersComponent} from './main/users/users.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   canActivate: [RequireUnauthGuard],
  //   component: LoginComponent
  // },
  {
    path: 'main',
    children: [
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            children: [
              {path: '', component: HomeComponent},
              {path: 'items', component: ItemsComponent},
              {path: 'users', component: UsersComponent},
              {path: 'reports', component: ReportsComponent},
            ]
          }
        ]
      }
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
