import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpTreeComponent } from './emp-tree/emp-tree.component';
import { HeadNavComponent } from './head-nav/head-nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsedMaterialModule } from '../material.modules';

import { BASE_PATH } from 'build/openapi/variables';
import { environment } from '../environments/environment';
import { SalChangerComponent } from './sal-changer/sal-changer.component';
import { SalMinimalComponent } from './sal-minimal/sal-minimal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    EmpTreeComponent,
    EmpDetailsComponent,
    PageNotFoundComponent,
    HeadNavComponent,
    SalMinimalComponent,
    SalChangerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UsedMaterialModule,
    IonicModule.forRoot({})
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule { }
