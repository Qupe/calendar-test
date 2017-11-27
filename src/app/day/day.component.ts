import {Component, HostListener, ElementRef, OnChanges, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DayComponent implements OnChanges {
  @Input('day') day;
  @Input('events') events;
  show = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    this.show = this.eRef.nativeElement.contains(event.target) && !event.target.classList.contains('event');
  }

  constructor(private eRef: ElementRef) {
  }

  ngOnChanges() {
    this.events.forEach(item => {
      if (this.day.date.toISOString() === item.date) {
        this.day.events.push(item);
      }
    });
  }
}
