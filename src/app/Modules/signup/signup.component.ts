import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../Services/http/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  passmatch = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private signupService: SignupService
  ) { 
    var accessToken = localStorage.getItem('token');
    if (accessToken != null && accessToken != "") {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
      this.signupForm = this.formBuilder.group({
          firstname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
          lastname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]], 
          username: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
          password: ['', Validators.required],
          cpassword: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    var param = {
      firstname: this.signupForm.controls.firstname.value,
      lastname: this.signupForm.controls.lastname.value,
      username: this.signupForm.controls.username.value,
      password: btoa(this.signupForm.controls.password.value)
    }

    this.loading = true;
    this.signupService.Signup(param)
        .subscribe(
            data => {
              if(data['statusCode'] == 200){
                this.router.navigate(['/']);
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

  CheckPass(){
    if(this.signupForm.controls.cpassword.value == ""){
      this.passmatch = false;
      return;
    }
    if(this.signupForm.controls.password.value !== this.signupForm.controls.cpassword.value){
      this.passmatch = true;
    }
    else{
      this.passmatch = false;
    }
  }

}
