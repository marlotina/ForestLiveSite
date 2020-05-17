import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { ConfirmEmailRequest } from 'src/app/model/account';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html'
})
export class ConfirmemailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService) { }

    activateAccount: boolean = false;

  ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {            
        const request: ConfirmEmailRequest = {
          Code: params.code,
          UserId: params.userId
        };
        
        this.accountService.ConfirmEmail(request).subscribe( 
          data => {
          this.activateAccount = true;  
          },
          error => {
              this.activateAccount = false;
          });
    });
  }
}
