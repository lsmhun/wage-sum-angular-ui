import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ApiModule } from 'build/openapi/api.module';
import { EmpTreeComponent } from './emp-tree/emp-tree.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeadNavComponent } from './head-nav/head-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpTreeComponent,
    EmpDetailsComponent,
    PageNotFoundComponent,
    HeadNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
