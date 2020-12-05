import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './Services/http/auth.interceptor';

import { LoginComponent } from './Modules/login/login.component';
import { SignupComponent } from './Modules/signup/signup.component';
import { HomeComponent } from './Modules/home/home.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BudgetComponent } from './Modules/budget/budget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
