import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [HeaderComponent, NavComponent, AsideComponent, FooterComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, NavComponent, AsideComponent, FooterComponent]
})
export class LayoutModule { }
