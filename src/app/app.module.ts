import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthModule } from '@auth0/auth0-angular';

import { HttpClientModule } from '@angular/common/http';

import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProtectedComponent,
    HeroesComponent,
    HeroeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-aranibar.us.auth0.com',
      clientId: '',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
