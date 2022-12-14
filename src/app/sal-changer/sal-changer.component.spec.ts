import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalChangerComponent } from './sal-changer.component';

describe('SalChangerComponent', () => {
  let component: SalChangerComponent;
  let fixture: ComponentFixture<SalChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalChangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
