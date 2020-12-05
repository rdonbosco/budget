import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/http/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private loginService: LoginService
  ) { 
    var accessToken = localStorage.getItem('token');
    if (accessToken != null && accessToken != "") {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
        // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    var param = {
      username: this.loginForm.controls.username.value,
      password: btoa(this.loginForm.controls.password.value)
    }

    this.loginService.Login(param)
        .subscribe(
            data => {
              if(data['statusCode'] == 200){
                localStorage.setItem("UserData", JSON.stringify(data['data']));
                localStorage.setItem("token", data['token']);
                location.reload();
              }
              else{
                this.error = data['message'];
              }
            },
            error => {
                this.error = error.error.message;
                this.loading = false;
            });
  }

}
