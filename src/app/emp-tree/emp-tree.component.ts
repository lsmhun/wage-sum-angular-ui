import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EmpService } from '../../../build/openapi/api/emp.service';


/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
    public isLoading = false,
    public id: number) { }
}


//@Injectable({ providedIn: 'root' })
export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
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

  disconnect(collectionViewer: CollectionViewer): void { 
    collectionViewer.viewChange.forEach(a => console.debug(a));
    this.dataChange.complete();
  }

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
    this.employeeService.findEmpsByMgrId(node.id)
      .subscribe(children => {
        const index = this.data.indexOf(node);
        if (!children || index < 0) { // If no children, or cannot find the node, no op
          return;
        }

        node.isLoading = true;

          if (expand) {

            const nodes = children.map(emp => {
              const currentId: number = emp.empId ?? NaN;
              const name = emp.lastName + ', ' + emp.firstName;
              return new DynamicFlatNode(name, node.level + 1, true, false, currentId);
            });
            this.data.splice(index + 1, 0, ...nodes);
          } else {
            let count = 0;
            for (
              let i = index + 1;
              i < this.data.length && this.data[i].level > node.level;
              i++, count++
            ) { 
              // just for count++
            }
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
    providers: [EmpService],
    standalone: false
})
export class EmpTreeComponent implements OnInit {

  constructor(private employeeService: EmpService,
    private route: ActivatedRoute) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.employeeService);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;


  ngOnInit() {
      const k: DynamicFlatNode[] = [];
      // root element
      const dfn = new DynamicFlatNode('ACME Corp.', 1, true, false, 0);
      k[0] = dfn;
      this.dataSource.data = k;
  }

}

