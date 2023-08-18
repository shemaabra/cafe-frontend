import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this._http.post(`${this.url}/product/add/`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  updateProduct(data: any): Observable<any> {
    return this._http.patch(`${this.url}/product/update/`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getProduct(): Observable<any> {
    return this._http.get(this.url + '/product/get/');
  }
  updateProductStatus(data: any): Observable<any> {
    return this._http.patch(`${this.url}/product/updateStatus/`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  deleteProduct(id: string) {
    return this._http.delete(`${this.url}/product/delete/${id}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getProductByCategoryId(id: any){}
}
