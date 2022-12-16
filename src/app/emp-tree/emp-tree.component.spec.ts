import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from 'src/material.modules';


import { of } from 'rxjs';

import { HttpEvent, HttpResponse } from '@angular/common/http';

import { Emp, EmpService, SalService } from 'build/openapi';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmpTreeComponent } from './emp-tree.component';

describe('EmpTreeComponent', () => {
  let component: EmpTreeComponent;
  let fixture: ComponentFixture<EmpTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UsedMaterialModule
      ],
      declarations: [ EmpTreeComponent ]
    })
    .compileComponents();


     // given empService
     const empService = TestBed.inject(EmpService);
     const data: Emp = {
       firstName: "first",
       lastName: "last",
       empId: 2,
       mgrId: 1,
       status: Emp.StatusEnum.Active,
       type: Emp.TypeEnum.Manager,
       userName: "man1"
     };
     let httpEventEmp: HttpEvent<Emp> = new HttpResponse<Emp>({ body: data });
     spyOn(empService, 'getEmpById').and.returnValue(of(httpEventEmp));
 
     // given mgrList
     let httpEventMgrList: HttpEvent<Array<Emp>> = new HttpResponse<Array<Emp>>({ body: [data] });
     spyOn(empService, 'findEmpsByType').and.returnValue(of(httpEventMgrList));
 
     // given salService
     const salService = TestBed.inject(SalService);
     let httpEventSal: HttpEvent<string> = new HttpResponse<string>({ body: "123" });
     spyOn(salService, 'getSalByEmpId').and.returnValue(of(httpEventSal));

    fixture = TestBed.createComponent(EmpTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
