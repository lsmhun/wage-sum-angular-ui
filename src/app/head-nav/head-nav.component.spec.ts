import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from '../../material.modules';

import { HeadNavComponent } from './head-nav.component';

describe('HeadNavComponent', () => {
  let component: HeadNavComponent;
  let fixture: ComponentFixture<HeadNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UsedMaterialModule
      ],
      declarations: [ HeadNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
