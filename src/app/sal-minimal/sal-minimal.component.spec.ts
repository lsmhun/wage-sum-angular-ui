import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from 'src/material.modules';

import { of } from 'rxjs';

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import { Emp, EmpService, SalService } from 'build/openapi';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { SalMinimalComponent } from './sal-minimal.component';

describe('SalMinimalComponent', () => {
  let component: SalMinimalComponent;
  let fixture: ComponentFixture<SalMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UsedMaterialModule
      ],
      declarations: [ SalMinimalComponent ]
    })
    .compileComponents();

    // given salService
    const salService = TestBed.inject(SalService);
    let httpEventSal: HttpEvent<string> = new HttpResponse<string>({body: "123"});
    spyOn(salService, 'getSalByEmpId').and.returnValue(of(httpEventSal));

    fixture = TestBed.createComponent(SalMinimalComponent);
    component = fixture.componentInstance;
    component.empId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
