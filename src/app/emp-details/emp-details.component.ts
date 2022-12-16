import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EmpService } from 'build/openapi/api/emp.service';
import { Emp } from 'build/openapi/model/emp';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.sass']
})
export class EmpDetailsComponent implements OnInit {
  constructor(private employeeService: EmpService,
    private route: ActivatedRoute,
    private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getEmployee();
      console.log("reloaded");
    });
  }
  @Input() emp: Emp = {} as Emp;

  showSpinner = false;

  managers: Emp[];

  empStatuses: Emp.StatusEnum[] = [Emp.StatusEnum.Active, Emp.StatusEnum.Inactive, Emp.StatusEnum.Deleted];

  empTypes: Emp.TypeEnum[] = [Emp.TypeEnum.Employee, Emp.TypeEnum.Manager];

  message = "";

  ngOnInit() {
    this.getEmployee();
    this.getManagers();
  }

  getEmployee(): void {
    this.message = "";
    const parameterId = this.route.snapshot.paramMap.get('id') ?? 'new';
    if (parameterId === 'new') {
      this.emp = {
        status: Emp.StatusEnum.Active,
        type: Emp.TypeEnum.Employee,
      } as Emp;

    } else {
      const id = parseInt(parameterId, 0);
      this.employeeService.getEmpById(id)
        .subscribe(c => this.emp = c);
    }
  }

  getManagers() {
    this.employeeService.findEmpsByType(Emp.TypeEnum.Manager)
      .subscribe(mgs => this.managers = mgs);
  }

  update(): void {
    this.showSpinner = true;
    this.message = "";
    this.employeeService.addEmp(this.emp)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.message = "Employee has been saved";
          this.showSpinner = false;
          //this.router.navigateByUrl("/emp-tree");
        },
        error: (e) => {
          console.error(e);
          this.message = e.statusText;
          this.showSpinner = false;
        },
        complete: () => {
          console.info('complete');
          this.showSpinner = false;
        }
      });
  }

  deleteEmployee(): void {
    this.showSpinner = true;
    this.message = "";
    const id = this.emp.empId ?? -1;
    if(id !== -1){
      this.employeeService.deleteEmp(id)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.message = "Employee has been deleted";
          this.showSpinner = false;
          this.router.navigateByUrl("/emp-tree");
        },
        error: (e) => {
          console.error(e);
          this.message = e.statusText;
          this.showSpinner = false;
        },
        complete: () => {
          console.info('done');
          this.showSpinner = false;
        }
      });
    }
  }
}
