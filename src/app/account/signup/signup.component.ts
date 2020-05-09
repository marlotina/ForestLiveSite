import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { TranslateService } from  '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  conflictUser = false;
  conflictEmail = false;
  errorRequest = false;
  conflictMessage: string;

  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
        translate:  TranslateService) { 
          translate.setDefaultLang('en');
          translate.use('en');
        }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
        return;
    }

    this.accountService.SignUp(this.registerForm.value).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
          if(error.status == "409"){
            this.conflictUser = true;
            this.conflictMessage = error.error == "CONFLICT_USERNAME" ? "User name is kepp" : "Email is keep";
          } else {
            this.errorRequest = true;
            this.conflictMessage = "Something was wrong, try later";
          }
      });
  }
}