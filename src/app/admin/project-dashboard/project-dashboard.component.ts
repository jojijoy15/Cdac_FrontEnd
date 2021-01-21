


import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project-model';
import { mileStones } from './example-data';
import { ProjectActivityItem, ProjectDataSource } from './project-dashboard-datasource';
import { AdminService } from '../../services/admin.service';
/** File node data with possible child nodes. */
export interface MilestoneTreeNode {
  name: string;
  type: string;
  children?: MilestoneTreeNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}
@Component({
  selector: 'admin-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ProjectActivityItem>;
  dataSource: ProjectDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['avatar','id', 'name','status','date'];
  
  public id: number;
  project:Project;

  ngOnInit() {
    this.dataSource = new ProjectDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

   /** The TreeControl controls the expand/collapse state of tree nodes.  */
   treeControl: FlatTreeControl<FlatTreeNode>;

   /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
   treeFlattener: MatTreeFlattener<MilestoneTreeNode, FlatTreeNode>;
 
   /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
   tdataSource: MatTreeFlatDataSource<MilestoneTreeNode, FlatTreeNode>;
 
   constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService) {
     //getting project id from route
     this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
     console.log(this.id);
     // Find the project that correspond with the id provided in route.
      this.project = this.adminService.projects.find(proj => proj.id === this.id);

     this.treeFlattener = new MatTreeFlattener(
       this.transformer,
       this.getLevel,
       this.isExpandable,
       this.getChildren);
 
     this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
     this.tdataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
     this.tdataSource.data = mileStones;

   }
 
   /** Transform the data to something the tree can read. */
   transformer(node:MilestoneTreeNode, level: number) {
     return {
       name: node.name,
       type: node.type,
       level: level,
       expandable: !!node.children
     };
   }
 
   /** Get the level of the node */
   getLevel(node: FlatTreeNode) {
     return node.level;
   }
 
   /** Get whether the node is expanded or not. */
   isExpandable(node: FlatTreeNode) {
     return node.expandable;
   }
 
   /** Get whether the node has children or not. */
   hasChild(index: number, node: FlatTreeNode) {
     return node.expandable;
   }
 
   /** Get the children for the node. */
   getChildren(node: MilestoneTreeNode): MilestoneTreeNode[] | null | undefined {
     return node.children;
   }
 
}

