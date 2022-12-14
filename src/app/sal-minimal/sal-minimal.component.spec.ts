import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalMinimalComponent } from './sal-minimal.component';

describe('SalMinimalComponent', () => {
  let component: SalMinimalComponent;
  let fixture: ComponentFixture<SalMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalMinimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
