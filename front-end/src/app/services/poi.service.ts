import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/api/poi';


@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) { }

  create(data: Object): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getPublished(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getDraft(): Observable<any> {
    return this.http.get(`${baseUrl}/draft`);
  }

  getOne(id: String): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`)
  }

  update(id: String, data: Object): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  changeStatus(id: String, data: Object): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }
}
