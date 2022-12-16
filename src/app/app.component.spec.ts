import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsedMaterialModule } from 'src/material.modules';
import { AppComponent } from './app.component';
import { EmpTreeComponent } from './emp-tree/emp-tree.component';
import { HeadNavComponent } from './head-nav/head-nav.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UsedMaterialModule
      ],
      declarations: [
        AppComponent,
        EmpTreeComponent,
        HeadNavComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wage-sum-angular-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('wage-sum-angular-ui');
  });

 /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('wage-sum-angular-ui app is running!');
  });*/
});
