import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './component/test-component/test.component';


const routes: Routes = [
  { path: 'test-1', component: TestComponent, },
  { path: 'test-2', component: TestComponent, },
  { path: 'test-3', component: TestComponent, },
  { path: 'test-4', component: TestComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
