import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;
  loading = false;
  errorResponse = false;
  emailNotFound = false;
  forgotPasswordOk = false;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService) { 
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.errorResponse = false;
    this.emailNotFound = false;

    if (this.forgotPasswordForm.invalid) {
        this.loading = false;
        return;
    }

    this.accountService.ForgotPassword(this.forgotPasswordForm.value)
      .pipe(first())  
      .subscribe(
        data => {
          this.forgotPasswordOk = true;
        },
        error => {
          if(error.status == "404") {
            this.emailNotFound = true;
          } else {
            this.errorResponse = true;
          }   
          this.loading = false;       
        });
  }
}