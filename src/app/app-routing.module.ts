import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTrxComponent } from './basic-trx/basic-trx.component';
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './notfound/notfound.component'
import { ProvidersComponent } from './providers/providers.component'
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'basic-trx',
    component: BasicTrxComponent,
  },
  {
  path: 'providers',
  component: ProvidersComponent
  },
  {
  path: 'createusers',
  component: CreateUserComponent
  },
  {
  path: 'home',
  component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
