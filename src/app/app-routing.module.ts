import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpTreeComponent } from './emp-tree/emp-tree.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'emp-tree', title: 'Employee hierarchy', component: EmpTreeComponent },
  { path: 'emp/:id', title: 'Employee details', component: EmpDetailsComponent },
  { path: '',   redirectTo: '/emp-tree', pathMatch: 'full' }, // redirect to `emp-tree`
  { path: '**', title: 'Page not found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
