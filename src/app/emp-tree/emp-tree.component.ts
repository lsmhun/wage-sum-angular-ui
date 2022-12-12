import { Component, OnInit, Injectable, Injector } from '@angular/core';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { EmpService } from 'build/openapi/api/emp.service';
import { Emp } from 'build/openapi/model/models';


/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false,
              public id: number) {}
}


@Injectable()
export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private employeeService: EmpService) {
                //this.sessionDataService.sessionData.subscribe(a => this.companyUrlName = a.companyUrlName);
              }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    this.employeeService.findEmpsByMgrId( node.id)
    .subscribe( children => {
      const index = this.data.indexOf(node);
      if (!children || index < 0) { // If no children, or cannot find the node, no op
        return;
      }
  
      node.isLoading = true;
  
        if (expand) {
          
          const nodes = children.map(emp => {
            let currentId:number = emp.id ?? NaN;
            var name = emp.lastName + ', ' + emp.firstName;
            return new DynamicFlatNode(name, node.level + 1, true, false, currentId);
            });
          this.data.splice(index + 1, 0, ...nodes);
        } else {
          let count = 0;
          for (let i = index + 1; i < this.data.length
            && this.data[i].level > node.level; i++, count++) {}
          this.data.splice(index + 1, count);
        }
  
        // notify the change
        this.dataChange.next(this.data);
        node.isLoading = false;
    });
  }
}

@Component({
  selector: 'app-emp-tree',
  templateUrl: './emp-tree.component.html',
  styleUrls: ['./emp-tree.component.sass'],
  providers: [EmpService]
})
export class EmpTreeComponent implements OnInit {

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;


  ngOnInit() {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.employeeService);
    //this.dataSource.data 
    this.employeeService.findEmpsByMgrId(NaN)
    .subscribe(res => {
      let rootEmp : Emp = res[0];
      let rootEmpId: number =  rootEmp.empId ??  NaN;
      let k: DynamicFlatNode[] = [];
      let dfn = new DynamicFlatNode(rootEmp.lastName + ', ' + rootEmp.firstName, 1, true, false, rootEmpId);
      k[0] = dfn;
      this.dataSource.data = k;
    });
  }

  constructor( private employeeService: EmpService,
              private route:ActivatedRoute) {
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}

