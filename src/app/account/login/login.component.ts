import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorResponse = false;
  notActivatedAccount = false;
  emailPassWrong = false;


  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public accountService: AccountService) { 
          
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorResponse = false;
    this.notActivatedAccount = false;
    this.emailPassWrong = false;

    if (this.loginForm.invalid) {
        return;
    }

    this.accountService.Login(this.loginForm.value)
      .pipe(first())  
      .subscribe(
        data => {
          this.router.navigate([''], { relativeTo: this.route });
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
