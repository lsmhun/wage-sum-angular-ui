import { Component } from '@angular/core';
import { environment } from './../environments/environment';

import { Emp } from 'build/openapi/model/emp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor() {
    console.log(environment.production); // Logs false for default environment
  }
  
  title = 'wage-sum-angular-ui';

  exampleEmp: Emp = {
    empId: 2,
    mgrId: 1,
    status: Emp.StatusEnum.Active,
    type: Emp.TypeEnum.Manager,
    userName: "man1"
  };

}
