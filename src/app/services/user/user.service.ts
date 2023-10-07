import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  signUp(data: any): Observable<any> {
    return this._http.post(this.url + '/user/signup', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  forgotPassword(data: any): Observable<any> {
    return this._http.post(this.url + '/user/forgotPassword', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  login(data: any): Observable<any> {
    return this._http.post(this.url + '/user/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  checkToken() {
    return this._http.get(this.url + '/user/checkToken');
  }
  changePassword(data: any) {
    return this._http.post(this.url + '/user/changePassword', data);
  }

  getUsers(){
    return this._http.get(this.url + '/user/get');
  }
  updatUser(data: any){
    return this._http.patch(this.url + 'user/update/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

}
