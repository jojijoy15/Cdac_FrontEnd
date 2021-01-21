import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminStudentsDataSource } from './admin-students-datasource';
//import { AdminStudentsDataSource, Student } from './admin-students-datasource';
import { MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { UploadExcelDialogComponent } from '../upload-excel-dialog/upload-excel-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { Student } from 'src/app/models/student-model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements AfterViewInit, OnInit {
  studentData:Student[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Student>;
  dataSource: AdminStudentsDataSource;
  file: File;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['prn', 'userAccount.firstName', 'userAccount.email', 'userAccount.phoneNumber'];
  errorMessage: any;
  constructor(public dialog: MatDialog,public adminService:AdminService) {}

  openDialog() {
    let dialogRef = this.dialog.open(UploadExcelDialogComponent); 
  
    dialogRef.afterClosed().subscribe(result => { 
      
      console.log("FILE Uploaded refreshing..list");
      this.ngOnInit();
   
    });
  }

  ngOnInit() {
    this.adminService.getStudentList().subscribe(
      (data: any[]) => {
        console.log(data.length);
        this.studentData = data;
        console.log(this.studentData.length);
        console.log("----INSIDE STUDENTS INIT METHOD------"+this.studentData.length);
        this.dataSource = new AdminStudentsDataSource(this.studentData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
     
  }

  ngAfterViewInit() {
    console.log("----INSIDE AFTER METHOD------");
    
  }
}

