import { HttpEvent, HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Emp, EmpService, SalService } from 'build/openapi';
import { of } from 'rxjs';
import { UsedMaterialModule } from 'src/material.modules';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';

import { SalChangerComponent } from '../sal-changer/sal-changer.component';
import { EmpDetailsComponent } from './emp-details.component';

describe('EmpDetailsComponent', () => {
  let component: EmpDetailsComponent;
  let fixture: ComponentFixture<EmpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EmpDetailsComponent, SalChangerComponent],
    imports: [RouterTestingModule,
        FormsModule,
        UsedMaterialModule,
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();
    fixture = TestBed.createComponent(EmpDetailsComponent);
    component = fixture.componentInstance;
    //component.emp = data;
    fixture.detectChanges();

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
    spyOn(empService, 'getEmpById').and.returnValue(of(httpEventEmp));

    // given mgrList
    const httpEventMgrList: HttpEvent<Array<Emp>> = new HttpResponse<Array<Emp>>({ body: [data] });
    spyOn(empService, 'findEmpsByType').and.returnValue(of(httpEventMgrList));

    // given salService
    const salService = TestBed.inject(SalService);
    const httpEventSal: HttpEvent<string> = new HttpResponse<string>({ body: "123" });
    spyOn(salService, 'getSalByEmpId').and.returnValue(of(httpEventSal));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
