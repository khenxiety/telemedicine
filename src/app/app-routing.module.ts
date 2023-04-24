import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/main.module').then((module) => module.MainModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),

    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: EmptyPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
