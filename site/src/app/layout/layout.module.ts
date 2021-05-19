import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [FooterComponent, UserSidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [FooterComponent, UserSidebarComponent, HeaderComponent]
})
export class LayoutModule { }
