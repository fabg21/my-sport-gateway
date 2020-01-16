import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySportGatewayTestModule } from '../../../../test.module';
import { CalendarDeleteDialogComponent } from 'app/entities/mySportTeam/calendar/calendar-delete-dialog.component';
import { CalendarService } from 'app/entities/mySportTeam/calendar/calendar.service';

describe('Component Tests', () => {
  describe('Calendar Management Delete Component', () => {
    let comp: CalendarDeleteDialogComponent;
    let fixture: ComponentFixture<CalendarDeleteDialogComponent>;
    let service: CalendarService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [CalendarDeleteDialogComponent]
      })
        .overrideTemplate(CalendarDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CalendarDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CalendarService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
