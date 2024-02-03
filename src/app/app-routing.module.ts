import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { LayoutComponent } from './components/private/layout/layout.component';
import { RoutesApp } from './enums/routes.enum';
import { sessionGuard } from './guards/session.guard';

const routes: Routes = [
  { path: RoutesApp.LOGIN, component: LoginComponent },
  {
    path: RoutesApp.REQUEST_MANAGER,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/request-manager/request-manager.module').then(
        m => m.RequestManagerModule
      ),
  },
  { path: '', redirectTo: '/' + RoutesApp.LOGIN, pathMatch: 'full' },
  // Puedes agregar una ruta comodín para manejar rutas no encontradas (opcional)
  { path: '**', redirectTo: '/login' + RoutesApp.LOGIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
