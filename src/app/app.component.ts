import { Component } from '@angular/core';

import { Emp } from 'build/openapi/model/emp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'wage-sum-angular-ui';

  exampleEmp: Emp = {
    empId: 2,
    mgrId: 1,
    status: Emp.StatusEnum.Active,
    type: Emp.TypeEnum.Manager,
    userName: "man1"
  };

}
