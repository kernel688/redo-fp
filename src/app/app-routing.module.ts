import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTrxComponent } from './basic-trx/basic-trx.component';
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './notfound/notfound.component'
import { ProvidersComponent } from './providers/providers.component'
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { PathActivationService } from './path-activation.service'
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'basic-trx',
    component: BasicTrxComponent,
    canActivate: [PathActivationService]
  },
  {
  path: 'providers',
  component: ProvidersComponent,
  canActivate: [PathActivationService]
  },
  {
  path: 'createusers',
  component: CreateUserComponent,
  canActivate: [PathActivationService]
  },
  {
  path: 'home',
  component: HomeComponent,
  canActivate: [PathActivationService]
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
