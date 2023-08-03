import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  url = environment.apiUrl;
  getDetails(): Observable<any> {
    return this._http.get(this.url + '/dashboard/details');
  }
}
