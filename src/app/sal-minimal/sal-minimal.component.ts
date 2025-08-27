import { Component,  OnInit, Input } from '@angular/core';
import { SalService } from '../../../build/openapi/api/sal.service';

@Component({
    selector: 'app-sal-minimal',
    templateUrl: './sal-minimal.component.html',
    styleUrls: ['./sal-minimal.component.sass'],
    standalone: false
})
export class SalMinimalComponent implements OnInit {

  constructor(private salaryService: SalService){}
  
  @Input() empId!: number;
  wageSum: number;
  empSal: number;

  showSpinner = false;

  ngOnInit(): void {
    this.collectEmpSalary();
    this.collectWageSum();
  }

  collectEmpSalary(){
    this.salaryService.getSalByEmpId(this.empId)
    .subscribe(c => this.empSal = parseInt(c, 0));
  }


  collectWageSum(){
    this.salaryService.getWageSumByMgrId(this.empId)
    .subscribe(c => this.wageSum = parseInt(c, 0));
  }
}
