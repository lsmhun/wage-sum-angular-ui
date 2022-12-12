import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ApiModule } from 'build/openapi/api.module';
import { EmpTreeComponent } from './emp-tree/emp-tree.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeadNavComponent } from './head-nav/head-nav.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsedMaterialModule } from '../material.modules';
import { HttpClientModule } from '@angular/common/http';

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
    FormsModule,
    HttpClientModule,
    UsedMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
