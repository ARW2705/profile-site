import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularPageVisibilityModule } from 'angular-page-visibility';

import {
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';
import 'hammerjs';
import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings
} from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoutingModule } from './routing/routing.module';

import { StringArrayPipe } from './pipes/string-array.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ProjectDataService } from './services/project-data.service';
import { EmailRequestService } from './services/email-request.service';
import { ProcessHttpErrorService } from './services/process-http-error.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    HeaderComponent,
    FooterComponent,
    StringArrayPipe
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatGridListModule,
    MatDividerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FlexLayoutModule,
    FormsModule,
    InlineSVGModule.forRoot(),
    ReactiveFormsModule,
    AngularPageVisibilityModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ProjectDataService,
    EmailRequestService,
    ProcessHttpErrorService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey:
          '6LdRbY8UAAAAAJAZcuyD1CiqFG1m_05adBM1js8G'
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
