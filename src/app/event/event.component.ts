import {Component, HostListener, ElementRef, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input('event') event;
  active = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    this.active = this.eRef.nativeElement.contains(event.target);
  }

  constructor(private eRef: ElementRef) {
  }

  ngOnInit() {
  }
}
