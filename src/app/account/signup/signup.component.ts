import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  conflictUser = false;
  conflictEmail = false;
  errorResponse = false;

  constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService) { 
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
    this.conflictUser = false;
    this.conflictEmail = false;
    this.errorResponse = false;

    if (this.registerForm.invalid) {
        return;
    }

    this.accountService.SignUp(this.registerForm.value)
      .pipe(first())  
      .subscribe(
        data => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error => {
            if(error.status == "409"){
              error.error == "CONFLICT_USERNAME" ? this.conflictUser = true : this.conflictEmail = true;
            } else {
              this.errorResponse = true;
            }
        });
  }
}