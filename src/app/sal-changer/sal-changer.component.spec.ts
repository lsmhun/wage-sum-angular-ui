import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from 'src/material.modules';

import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HttpEvent, HttpResponse } from '@angular/common/http';

import { Emp, SalService } from 'build/openapi';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SalChangerComponent } from './sal-changer.component';

describe('SalChangerComponent', () => {
  let component: SalChangerComponent;
  let fixture: ComponentFixture<SalChangerComponent>;

  beforeEach(async () => {

    const data: Emp = {
      firstName: "first",
      lastName: "last",
      empId: 2,
      mgrId: 1,
      status: Emp.StatusEnum.Active,
      type: Emp.TypeEnum.Manager,
      userName: "man1"
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        UsedMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ SalChangerComponent ]
    })
    .compileComponents();

    // given salService
    const salService = TestBed.inject(SalService);
    const httpEventSal: HttpEvent<string> = new HttpResponse<string>({body: "123"});
    spyOn(salService, 'getSalByEmpId').and.returnValue(of(httpEventSal));

    fixture = TestBed.createComponent(SalChangerComponent);
    component = fixture.componentInstance;
    component.emp = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
