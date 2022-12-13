import { Component, OnInit, Input, Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Emp } from 'build/openapi/model/emp';
import { EmpService } from 'build/openapi/api/emp.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.sass']
})
export class EmpDetailsComponent implements OnInit 
{
  constructor( private employeeService: EmpService,
    private route: ActivatedRoute,
    private location: Location) {
  }
  @Input() emp: Emp;

  showSpinner = false;

  managers: Emp[];

  empStatuses: Emp.StatusEnum[] = [Emp.StatusEnum.Active,Emp.StatusEnum.Inactive,Emp.StatusEnum.Deleted];

  empTypes: Emp.TypeEnum[] = [Emp.TypeEnum.Employee, Emp.TypeEnum.Manager];
  
  ngOnInit() {
    this.getEmployee();
    this.getManagers();
  }

  getEmployee(): void {
    const parameterId = this.route.snapshot.paramMap.get('id');
    if(parameterId === 'new'){
      this.emp = {};
      
    }else {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.employeeService.getEmpById(id)
        .subscribe(c => this.emp = c);
    }
  }

  getManagers(){
    this.employeeService.findEmpsByType(Emp.TypeEnum.Manager)
    .subscribe(mgs => this.managers = mgs);
  }

  update(): void {
    
    this.employeeService.addEmp(this.emp)
      .subscribe(c => this.emp = c);
  }
}
