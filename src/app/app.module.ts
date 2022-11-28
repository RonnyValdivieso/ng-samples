import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { IdentityServerComponent } from './components/login/identity-server/identity-server.component';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileService } from './services/file.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CountdownModule } from 'ngx-countdown';
import { VimeoPlayerComponent } from './components/vimeo-player/vimeo-player.component';
import { AutoScrollComponent } from './components/auto-scroll/auto-scroll.component';
import { CookiesComponent } from './components/cookies/cookies.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    IdentityServerComponent,
    FileUploaderComponent,
    CountdownComponent,
    VimeoPlayerComponent,
    CookiesComponent,
    // AutoScrollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    // AuthModule.forRoot({
    //   config: {
    //     authority: 'https://localhost:7284',
    //     redirectUrl: window.location.origin,
    //     postLogoutRedirectUri: window.location.origin,
    //     clientId: 'webadmin',
    //     scope: 'openid profile email offline_access',
    //     responseType: 'code',
    //     useRefreshToken: true,
    //     logLevel: LogLevel.Debug,
    //   },
    // })
  ],
  providers: [
    HttpClient,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
