import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TopHeaderComponent } from './top-header/top-header.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, TopHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, FooterComponent, TopHeaderComponent]
})
export class LayoutModule { }
