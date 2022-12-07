import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTreeComponent } from './emp-tree.component';

describe('EmpTreeComponent', () => {
  let component: EmpTreeComponent;
  let fixture: ComponentFixture<EmpTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
