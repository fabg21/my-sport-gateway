import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { CalendarComponent } from 'app/entities/mySportTeam/calendar/calendar.component';
import { CalendarService } from 'app/entities/mySportTeam/calendar/calendar.service';
import { Calendar } from 'app/shared/model/mySportTeam/calendar.model';

describe('Component Tests', () => {
  describe('Calendar Management Component', () => {
    let comp: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;
    let service: CalendarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [CalendarComponent],
        providers: []
      })
        .overrideTemplate(CalendarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CalendarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CalendarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Calendar(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.calendars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
