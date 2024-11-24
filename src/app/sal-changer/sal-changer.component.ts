import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SalService } from 'build/openapi';
import { filter } from 'rxjs/operators';

import { Emp } from 'build/openapi/model/emp';

@Component({
    selector: 'app-sal-changer',
    templateUrl: './sal-changer.component.html',
    styleUrls: ['./sal-changer.component.sass'],
    standalone: false
})
export class SalChangerComponent implements OnInit, OnChanges {

  constructor(private salaryService: SalService,
    private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.empSal = 0;
      this.collectEmpSalary();
    });
  }

  @Input() emp: Emp;
  empSal = 0;

  message = "";
  showSpinner = false;

  ngOnInit() {
    this.collectEmpSalary();
  }

  ngOnChanges() {
    this.collectEmpSalary();
  }

  collectEmpSalary() {
    this.message = "";
    const eid = this.emp.empId ?? -1;
    if (eid === -1) {
      this.empSal = 0;
    } else {
      this.salaryService.getSalByEmpId(eid)
        .subscribe(c => this.empSal = parseInt(c, 0));
    }
  }

  updateEmpSalary() {
    const salStr = String(this.empSal);
    const eId = this.emp.empId ?? -1;
    if (eId !== -1) {
      this.salaryService.updateSalWithForm(eId, salStr)
        .subscribe(
          //c => this.empSal = parseInt(c!, 0)
          {
            next: (v) => {
              console.log(v);
              this.message = "Salary has been updated";
              this.showSpinner = false;
            },
            error: (e) => {
              console.error(e);
              this.message = e.statusText;
              this.showSpinner = false;
            },
            complete: () => {
              this.showSpinner = false;
            }
          }
          );
    } else{
      this.message = "Employee is not identified";
    }
  }
}
