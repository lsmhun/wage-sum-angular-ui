import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalService } from 'build/openapi';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Emp } from 'build/openapi/model/emp';

@Component({
  selector: 'app-sal-changer',
  templateUrl: './sal-changer.component.html',
  styleUrls: ['./sal-changer.component.sass']
})
export class SalChangerComponent implements OnInit, OnChanges {

  constructor(private salaryService: SalService,
    private route: ActivatedRoute,
    private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.empSal = 0;
      this.collectEmpSalary();
    });
  }

  @Input() emp: Emp;
  empSal: number = 0;

  message: string = "";
  showSpinner: boolean = false;

  ngOnInit() {
    this.collectEmpSalary();
  }

  ngOnChanges() {
    this.collectEmpSalary();
  }

  collectEmpSalary() {
    this.message = "";
    let eid = this.emp.empId ?? -1;
    if (eid === -1) {
      this.empSal = 0;
    } else {
      this.salaryService.getSalByEmpId(eid)
        .subscribe(c => this.empSal = parseInt(c!, 0));
    }
  }

  updateEmpSalary() {
    let salStr: string = String(this.empSal);
    let eId = this.emp.empId ?? -1;
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
