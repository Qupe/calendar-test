import {Component, OnInit, Input} from '@angular/core';
import {EventsService} from '../events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  @Input('show') show;
  @Input('date') date;

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
  }

  submit(form) {
    form.members = form.members ? form.members.split(',').map(
      member => member.trim()
    ) : [];
    form.date = this.date.toISOString();

    this.eventsService.addEvent(form).subscribe(response => {
      if (response['success']) {
        this.eventsService.updateEvents();
        this.show = false;
      }
    });
  }
}
