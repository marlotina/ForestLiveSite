import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, TopHeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HeaderComponent, FooterComponent, TopHeaderComponent]
})
export class LayoutModule { }
