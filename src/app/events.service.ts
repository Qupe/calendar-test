import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

const API_URL = 'https://fast-temple-57619.herokuapp.com/api/calendar/';

@Injectable()
export class EventsService {

  updateEventsSource = new Subject<string>();
  updateEventsObservable = this.updateEventsSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getEvents() {
    return this.http.get(API_URL);
  }

  addEvent(body) {
    return this.http.post(API_URL, body);
  }

  updateEvents() {
    this.updateEventsSource.next();
  }

}
