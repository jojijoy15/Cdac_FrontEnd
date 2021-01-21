import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {Guide} from '../models/guide-model';
import { Project } from '../models/project-model';
import { Student } from '../models/student-model';

import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { CreateGuide } from '../models/regGuide';
import { FormBuilder } from '@angular/forms';
import { projects } from '../admin/project-dashboard/example-data';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  projects:Project[] = projects;
  
  constructor(private http:HttpClient, private formBuilder: FormBuilder) { }

  registerStudent(file: File): Observable<HttpEvent<{}>> {
    console.log("FILE HERE ###:::" + file);
    var fileData = this.formBuilder.group({file:['']});
    fileData.get('file').setValue(file);
    // const formData: FormData = new FormData();
    
    // formData.append('file', file);

    console.log(fileData);
    const headers= new HttpHeaders()
    .set('content-type', 'multipart/form-data')
    .set('Access-Control-Allow-Origin', '*');
    const req = new HttpRequest('POST', `${environment.apiUrl}/admin/students/register`,fileData,{ 'headers': headers });
    return this.http.request(req);
  }
 

  registerGuide(data: any): Observable<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    const body=JSON.stringify(data);
    console.log(data);
    return this.http.post<any>(`${environment.apiUrl}/admin/guides/register`,{body},{ 'headers': headers });
  
  }
  getGuideList():Observable<Guide[]>{
    return this.http.get<Guide[]>(`${environment.apiUrl}/admin/guides`);
  }
  getProjectList():Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/admin/projects/list`);
  }
  getStudentList():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/admin/students`);
  }
  getCourseList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${environment.apiUrl}/course/list`,{ 'headers': headers });
  }
  getTechnologyList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${environment.apiUrl}/technology/list`,{ 'headers': headers });
  }
  getTeamSize():Observable<any>{
    return this.http.get(`${environment.apiUrl}/admin/teamsize`);
  }

  /* setTeamSize(count:number):Observable<any>{
    return this.http.put(`${environment.apiUrl}/admin/userid`)
  }*/
 //exception handling
 /*private HandleError(errorResponse:HttpErrorResponse){
   if(errorResponse.error instanceof ErrorEvent){
     console.error('client Side Error :',errorResponse.error.message);
   } else {
        console.error('Server Side Error:',errorResponse );
   }
   return new ErrorObservable("There is problem with server");
 }
*/  
}
