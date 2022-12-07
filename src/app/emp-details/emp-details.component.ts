import { Component, OnInit, Input, Injectable, Injector } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';
import { Emp } from 'build/openapi/model/emp';
import { EmpService } from 'build/openapi/api/emp.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.sass']
})
export class EmpDetailsComponent 
//implements OnInit 
{
  emp: Emp = {
    empId: 2,
    mgrId: 1,
    status: Emp.StatusEnum.Active,
    type: Emp.TypeEnum.Manager,
    userName: "man1"
  };

  showSpinner = false;
  
}
