import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from '../../Services/http/budget.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  budgetForm: FormGroup;
  loading = false;
  error = '';
  UserData = JSON.parse(localStorage.getItem("UserData"));

  constructor(private formBuilder: FormBuilder,
      private router: Router,
      private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgetForm = this.formBuilder.group({
      type: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      allocation: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      spent: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      month: ['', Validators.required],
      year: ['', Validators.required]
    });
  }
  
  onSubmit() {

    if (this.budgetForm.invalid) {
      return;
    }

    const param = {
      type: this.budgetForm.controls.type.value,
      allocation: this.budgetForm.controls.allocation.value,
      spent: this.budgetForm.controls.spent.value,
      month: this.budgetForm.controls.month.value,
      year: this.budgetForm.controls.year.value,
      userId: this.UserData.userId
    };

    this.budgetService.Budget(param)
        .subscribe(
            data => {
              if (data['statusCode'] === 200){
                this.router.navigate(['/home']);
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
