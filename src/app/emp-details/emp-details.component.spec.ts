import { HttpEvent, HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UsedMaterialModule } from '../../material.modules';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';

import { SalChangerComponent } from '../sal-changer/sal-changer.component';
import { EmpDetailsComponent } from './emp-details.component';
import { Emp } from '../../../build/openapi/model/emp';
import { EmpService } from '../../../build/openapi/api/emp.service';
import { SalService } from '../../../build/openapi/api/sal.service';

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
    jest.spyOn(empService, 'getEmpById').mockReturnValue(of(httpEventEmp));

    // given mgrList
    const httpEventMgrList: HttpEvent<Array<Emp>> = new HttpResponse<Array<Emp>>({ body: [data] });
    jest.spyOn(empService, 'findEmpsByType').mockReturnValue(of(httpEventMgrList));

    // given salService
    const salService = TestBed.inject(SalService);
    const httpEventSal: HttpEvent<string> = new HttpResponse<string>({ body: "123" });
    jest.spyOn(salService, 'getSalByEmpId').mockReturnValue(of(httpEventSal));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
