import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { idUserLogged } from 'app/app.component';
import { ResponseApp } from 'app/models/response';
import { Event } from 'app/models/event';
import { Observable } from 'rxjs';
import { DefaultService } from './default.service';

@Injectable({
  providedIn: 'root',
})
export class EventService extends DefaultService {
  constructor(private http: HttpClient) {
    super('event');
  }

  list(event: Event): Observable<ResponseApp<Event[]>> {
    return this.http.get<ResponseApp<Event[]>>(`${this.url}/${event}/${idUserLogged}`);
  }

  findById(id: string): Observable<ResponseApp<Event>> {
    return this.http.get<ResponseApp<Event>>(`${this.url}/${id}`);
  }

  create(event: Event): Observable<ResponseApp<Event>> {
    return this.http.post<ResponseApp<Event>>(this.url, event);
  }

  edit(event: Event): Observable<ResponseApp<Event>> {
    return this.http.put<ResponseApp<Event>>(`${this.url}/${event.id}`, event);
  }

  delete(id: String): Observable<ResponseApp<Event>> {
    return this.http.delete<ResponseApp<Event>>(`${this.url}/${id}`);
  }
}
