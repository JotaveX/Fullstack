import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseApp } from 'app/models/response';
import { Vaca } from 'app/models/vaca';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class VacaService extends DefaultService {
  constructor(private http: HttpClient) {
    super('vaca');
  }

  list(): Observable<ResponseApp<Vaca[]>> {
    return this.http.get<ResponseApp<Vaca[]>>(this.url);
  }

  findById(id: string): Observable<ResponseApp<Vaca>> {
    return this.http.get<ResponseApp<Vaca>>(`${this.url}/${id}`);
  }

  create(vaca: Vaca): Observable<ResponseApp<Vaca>> {
    return this.http.post<ResponseApp<Vaca>>(this.url, vaca);
  }

  edit(vaca: Vaca): Observable<ResponseApp<Vaca>> {
    return this.http.put<ResponseApp<Vaca>>(`${this.url}/${vaca.name}`, vaca);
  }

  delete(id: String): Observable<ResponseApp<Vaca>> {
    return this.http.delete<ResponseApp<Vaca>>(`${this.url}/${id}`);
  }
}
