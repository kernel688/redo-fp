import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTrxComponent } from './basic-trx/basic-trx.component';
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './notfound/notfound.component'
import { ProvidersComponent } from './providers/providers.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'basic-trx',
    component: BasicTrxComponent
  },
  {
  path: 'providers',
  component: ProvidersComponent
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
