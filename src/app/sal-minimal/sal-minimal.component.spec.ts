import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from '../../material.modules';

import { of } from 'rxjs';

import { HttpEvent, HttpResponse, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SalMinimalComponent } from './sal-minimal.component';
import { SalService } from '../../../build/openapi/api/sal.service';

describe('SalMinimalComponent', () => {
  let component: SalMinimalComponent;
  let fixture: ComponentFixture<SalMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SalMinimalComponent],
    imports: [RouterTestingModule,
        UsedMaterialModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    // given salService
    const salService = TestBed.inject(SalService);
    const httpEventSal: HttpEvent<string> = new HttpResponse<string>({body: "123"});
    jest.spyOn(salService, 'getSalByEmpId').mockReturnValue(of(httpEventSal));

    fixture = TestBed.createComponent(SalMinimalComponent);
    component = fixture.componentInstance;
    component.empId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
