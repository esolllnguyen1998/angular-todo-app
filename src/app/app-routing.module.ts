import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthGuardService } from './services/authen-guard.service';

const routes: Routes = [
  { path: 'home', component: TodoListComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutUsComponent, canActivate: [AuthGuardService] },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '', component: AuthenticationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})

export class AppRoutingModule { }
