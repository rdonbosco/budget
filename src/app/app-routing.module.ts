import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Modules/login/login.component';
import { SignupComponent } from './Modules/signup/signup.component';
import { HomeComponent } from './Modules/home/home.component';
import { BudgetComponent } from './Modules/budget/budget.component';
import { RouterprotectionguardService } from './Services/non-http/routerprotectionguard.service';

const routes: Routes = [ { path: '', component: LoginComponent },
                         { path: 'signup', component: SignupComponent},
                         { path: 'home', component: HomeComponent, canActivate: [RouterprotectionguardService]},
                         { path: 'budget', component: BudgetComponent, canActivate: [RouterprotectionguardService]},
                         { path: '**', redirectTo: '', pathMatch: 'full' }  ]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
