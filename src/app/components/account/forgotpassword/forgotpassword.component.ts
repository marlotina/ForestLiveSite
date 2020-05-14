import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html'
})

export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;
  errorResponse = false;
  notActivatedAccount = false;
  emailPassWrong = false;


  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService) { 
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorResponse = false;
    this.notActivatedAccount = false;
    this.emailPassWrong = false;

    if (this.forgotPasswordForm.invalid) {
        return;
    }

    this.accountService.ForgotPassword(this.forgotPasswordForm.value)
      .pipe(first())  
      .subscribe(
        data => {
          
        },
        error => {
          if(error.status == "409") {
            this.notActivatedAccount = true;
          } else {
            if(error.error == "EMAIL_PASS"){
              this.emailPassWrong = true;
            } else {
              this.errorResponse = true;
            }
          }
        });
  }
}