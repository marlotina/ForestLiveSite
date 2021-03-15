import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from  '@ngx-translate/core';
import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { CommonDialogComponent } from './components/shared/common-dialog/common-dialog.component';
import { ImageDialogComponent } from './components/shared/image-dialog/image-dialog.component';

export function jwtTokenGetter() {
  return localStorage.getItem("access_token");
}


export  function  HttpLoaderFactory(http:  HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CommonDialogComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide:  TranslateLoader,
        useFactory:  HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: jwtTokenGetter,
          whitelistedDomains: environment.whiteListDomains,
          blacklistedRoutes: environment.blacklistedRoutes
        },
      })
  ],
  exports: [TranslateModule],
  entryComponents: [CommonDialogComponent, ImageDialogComponent],
  providers: [TranslateService],
  bootstrap: [AppComponent]

})

export class AppModule { }


