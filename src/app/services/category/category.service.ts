import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  add(data: any): Observable<any> {
    return this._http.post(this.url + '/category/add', data);
  }

  update(data: any): Observable<any> {
    return this._http.patch(this.url + '/category/update', data);
  }

  getCategory(): Observable<any> {
    return this._http.get(this.url + '/category/get');
  }
}
