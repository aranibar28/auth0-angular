# Autenticación Auth0 - Angular 13+

Instalar el SDK de Auth0 Angular

    npm install @auth0/auth0-angular

Registrar y configurar el `AuthModule` en el archivo `app.modules.ts`

    import { AuthModule } from '@auth0/auth0-angular';

    @NgModule({
        ...
        imports: [
            AuthModule.forRoot({
                domain: 'dev-aranibar.us.auth0.com',
                clientId: 'nn52dbYcxhHsZdOE33elQSJsRBnDy2Wm',
                cacheLocation: 'localstorage',
                useRefreshTokens: true
            }),
        ],
    })

Crear las funciones login y logout mediante la importación `AuthService` en el archivo `navbar.components.ts`

    import { AuthService } from '@auth0/auth0-angular';

    export class NavbarComponent {
    constructor(public auth: AuthService) {}
        login() {
            this.auth.loginWithRedirect();
        }
        logout() {
            this.auth.logout();
        }
    }

Insertar los buttons en el archivo `navbar.components.html` con sus respectivas funciones

    <div>
        <button (click)="login()" *ngIf="!(auth.isAuthenticated$ | async)">
            Login
        </button>
        <button (click)="logout()" *ngIf="(auth.isAuthenticated$ | async)">
            Logout
        </button>
    </div>

Para proteger una ruta selecionamos el módulo y configuramos el constructor mediante la importación `AuthService`

    import { AuthService } from '@auth0/auth0-angular';
    constructor(public auth: AuthService) {}

Luego en el Sistema de rutas del archivo `app.routes.ts` configuramos la ruta mediante la importación `AuthGuard`

    Import { AuthGuard } from '@auth0/auth0-angular';

    const routes: Routes = [
        {
            path: 'example',
            component: ExampleComponent,
            canActivate: [AuthGuard], 
        },

    ];
