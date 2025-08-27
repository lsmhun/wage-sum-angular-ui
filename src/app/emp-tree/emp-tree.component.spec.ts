import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from '../../material.modules';


import { of } from 'rxjs';

import { HttpEvent, HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EmpTreeComponent } from './emp-tree.component';
import { EmpService } from '../../../build/openapi/api/emp.service';
import { Emp } from '../../../build/openapi/model/emp';
import { SalService } from '../../../build/openapi/api/sal.service';

describe('EmpTreeComponent', () => {
  let component: EmpTreeComponent;
  let fixture: ComponentFixture<EmpTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EmpTreeComponent],
    imports: [RouterTestingModule,
        UsedMaterialModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
     const httpEventEmp: HttpEvent<Emp> = new HttpResponse<Emp>({ body: data });
     jest.spyOn(empService, 'getEmpById').mockReturnValue(of(httpEventEmp));
 
     // given mgrList
     const httpEventMgrList: HttpEvent<Array<Emp>> = new HttpResponse<Array<Emp>>({ body: [data] });
     jest.spyOn(empService, 'findEmpsByType').mockReturnValue(of(httpEventMgrList));
 
     // given salService
     const salService = TestBed.inject(SalService);
     const httpEventSal: HttpEvent<string> = new HttpResponse<string>({ body: "123" });
     jest.spyOn(salService, 'getSalByEmpId').mockReturnValue(of(httpEventSal));

    fixture = TestBed.createComponent(EmpTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
