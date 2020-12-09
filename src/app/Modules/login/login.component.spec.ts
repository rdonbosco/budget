import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../Services/http/login.service';
import { TestMockService } from '../../Services/non-http/test.mock.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,RouterTestingModule,HttpClientModule],
      declarations: [
        LoginComponent,
      ],
      providers: [ {provide: LoginService, useClass: TestMockService} ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should login user when form is valid', () => {
    component.loginForm.setValue({username:'admin',password:'admin'});
    spyOn(component.router, 'navigate');
    component.onSubmit();
    expect(component.router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not login call when form is invalid', () => {
    component.loginForm.setValue({username:'',password:''});
    spyOn(component.router, 'navigate');
    component.onSubmit();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
