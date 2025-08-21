import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from '../../material.modules';

import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HttpEvent, HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SalChangerComponent } from './sal-changer.component';
import { Emp } from '../../../build/openapi/model/emp';
import { SalService } from '../../../build/openapi/api/sal.service';

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
    declarations: [SalChangerComponent],
    imports: [RouterTestingModule,
        FormsModule,
        UsedMaterialModule,
        BrowserAnimationsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    // given salService
    const salService = TestBed.inject(SalService);
    const httpEventSal: HttpEvent<string> = new HttpResponse<string>({body: "123"});
    jest.spyOn(salService, 'getSalByEmpId').mockReturnValue(of(httpEventSal));

    fixture = TestBed.createComponent(SalChangerComponent);
    component = fixture.componentInstance;
    component.emp = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
