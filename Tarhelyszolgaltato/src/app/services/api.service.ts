import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  private tokenName = "tarhelyszolgaltato";
  private server = `http://localhost:3000/api`;

  getToken():String | null{
    return localStorage.getItem(this.tokenName);
  }

  tokenHeader():{ headers: HttpHeaders }{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers }
  }

  registration(data:object){
    return this.http.post(this.server + '/users/register', data);
  }

  login(data:object){
    return this.http.post(this.server + '/users/login/', data);
  }

  read(table: string, field:string, op: string, value: string){
    return this.http.get(this.server + '/public/'+table+'/'+field+'/'+op+'/'+value);
  }

  readAll(table: string){
    return this.http.get(this.server + '/public/' + table);
  }

  // token-el védett metódusok:

  select(table: string, field:string, op: string, value: string){
    return this.http.get(this.server + '/'+table+'/'+field+'/'+op+'/'+value, this.tokenHeader());
  }

  selectAll(table: string){
    return this.http.get(this.server + '/' + table, this.tokenHeader());
  }

  insert(table: string, data:object){
    return this.http.post(this.server + '/'+table, data, this.tokenHeader());
  }

  update(table:string, id:string, data:object){
    return this.http.post(this.server + '/'+table+'/id/eq/'+id, data, this.tokenHeader());
  }

  delete(table:string, id:string){
    return this.http.delete(this.server + '/'+table+'/id/eq/'+id, this.tokenHeader());
  }

  sendMail(data:object){
    return this.http.post(this.server + '/send', data);
  }

  updatePasswd(id:string,data:object){
    return this.http.patch(this.server + '/public/users/id/eq',+id, data);
  }

  uploadFile(file:File){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.server + '/upload', formData, this.tokenHeader());
  }

  deleteFile(file:File){
    return this.http.delete(this.server + '/delete'+file, this.tokenHeader());
  }
}
