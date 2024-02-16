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
  {
    path: RoutesApp.APPLICANT_TYPE,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/applicant-type/applicant-type.module').then(
        m => m.ApplicantTypeModule
      ),
  },
  {
    path: RoutesApp.REQUEST_TYPE,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/request-type/request-type.module').then(
        m => m.RequestTypeModule
      ),
  },
  {
    path: RoutesApp.APPLICANT_REQUEST,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/applicant-request/applicant-request.module').then(
        m => m.ApplicantRequestModule
      ),
  },
  {
    path: RoutesApp.MODALITY,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/modality/modality.module').then(m => m.ModalityModule),
  },
  {
    path: RoutesApp.CATEGORY,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/category/category.module').then(m => m.CategoryModule),
  },
  {
    path: RoutesApp.SEARCH_REQUEST,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/search-request/search-request.module').then(
        m => m.SearchRequestModule
      ),
  },
  {
    path: RoutesApp.REQUEST_REPORT,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/requests-report/requests-report.module').then(
        m => m.RequestsReportModule
      ),
  },
  {
    path: RoutesApp.REQUEST_REPORT,
    canActivate: [sessionGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./components/private/requests-report/requests-report.module').then(
        m => m.RequestsReportModule
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
