import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroesComponent } from './components/heroes/heroes.component';

import { ProtectedComponent } from './components/protected/protected.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  {
    path: 'protegida',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
