import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from './settings-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SettingsMenuComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [SettingsMenuComponent]
})
export class SettingsMenuModule { }
