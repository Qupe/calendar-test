import {Component, OnInit, OnChanges} from '@angular/core';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnChanges, OnInit {
  currentDate = new Date();
  formatedDate = null;
  days = [];
  events = [];

  constructor(private eventService: EventsService) {
    eventService.updateEventsObservable.subscribe(() => {
      this.updateEvents();
    });
  }

  ngOnInit() {
    this.updateEvents();
  }

  ngOnChanges() {
    this.days = this.setDays();
  }

  setDays() {
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const daysCount = new Date(year, month + 1, 0).getDate();
    const allDays = [];

    this.formatedDate = this.currentDate.toLocaleString('ru', {month: 'long'}) + ' ' + year;

    for (let i = 1; i <= daysCount; i++) {
      allDays.push({
        current: true,
        date: new Date(year, month, i),
        events: [],
        number: i
      });
    }

    const firstDayDate = new Date(year, month, allDays[0].number);
    const lastDayDate = new Date(year, month, allDays[allDays.length - 1].number);

    let beginDay = firstDayDate.getDay();

    while (beginDay > 1) {
      const number = new Date(firstDayDate.setDate(firstDayDate.getDate() - 1)).getDate();
      const date = new Date(year, month - 1, number);

      allDays.unshift({current: false, date: date, events: [], number: number});
      beginDay--;
    }

    let endDay = lastDayDate.getDay();

    while (endDay > 0 && endDay < 7) {
      const number = new Date(lastDayDate.setDate(lastDayDate.getDate() + 1)).getDate();
      const date = new Date(year, month + 1, number);

      allDays.push({current: false, date: date, events: [], number: number});
      endDay++;
    }

    return allDays;
  }

  switchDate(action) {
    if (action === 'next') {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    } else if (action === 'prev') {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }

    this.days = this.setDays();
  }

  updateEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data['list'];
      this.days = this.setDays();
    });
  }
}
