import {BrowserModule} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import locale from '@angular/common/locales/ru';

import {AppComponent} from './app.component';
import {DayComponent} from './day/day.component';
import {CalendarComponent} from './calendar/calendar.component';
import {SwitcherComponent} from './switcher/switcher.component';
import {EventComponent} from './event/event.component';
import {EventsService} from './events.service';
import {AddEventComponent} from './add-event/add-event.component';

registerLocaleData(locale);

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    CalendarComponent,
    SwitcherComponent,
    EventComponent,
    AddEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EventsService,
    {provide: LOCALE_ID, useValue: 'ru_RU'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
