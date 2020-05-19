import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordRequest } from 'src/app/model/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html'
})
export class ResetpasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  errorResponse = false;
  notSamePassword = false;
  resetPasswordOk = false;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService) { 
        
      this.resetPasswordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
      });
  }
  
  get f() { return this.resetPasswordForm.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.errorResponse = false;
    this.notSamePassword = false;

    if (this.resetPasswordForm.invalid) {
        return;
    }

    if(this.checkPasswordsInvalid(this.resetPasswordForm)){
      this.notSamePassword = true;
      this.resetPasswordForm.controls.repeatPassword.setErrors({'incorrect': true});
      return;
    }
    
    let request = new ResetPasswordRequest();

    this.activatedRoute.queryParams.subscribe(params => {            
      request.code = params.code,
      request.userId = params.userId,
      request.newPassword = this.resetPasswordForm.controls.password.value
    });

    this.accountService.ResetPassword(request)
      .pipe(first())  
      .subscribe(
        data => {
          this.resetPasswordOk = true;
        },
        error => {
          this.errorResponse = true;
        });
  }

  checkPasswordsInvalid(group: FormGroup) { 
    let pass = group.get('password').value;
    let repeatPassword = group.get('repeatPassword').value;

    if(pass === repeatPassword){
      return false;
    } else {
      return true;
    }
  }

}
