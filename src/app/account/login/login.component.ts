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


  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService) { 
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

    if (this.loginForm.invalid) {
        return;
    }

    this.accountService.SignUp(this.loginForm.value)
      .pipe(first())  
      .subscribe(
        data => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
          this.errorResponse = true;
        });
  }
}
