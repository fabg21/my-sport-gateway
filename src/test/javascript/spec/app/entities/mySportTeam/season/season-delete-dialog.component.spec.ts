import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySportGatewayTestModule } from '../../../../test.module';
import { SeasonDeleteDialogComponent } from 'app/entities/mySportTeam/season/season-delete-dialog.component';
import { SeasonService } from 'app/entities/mySportTeam/season/season.service';

describe('Component Tests', () => {
  describe('Season Management Delete Component', () => {
    let comp: SeasonDeleteDialogComponent;
    let fixture: ComponentFixture<SeasonDeleteDialogComponent>;
    let service: SeasonService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [SeasonDeleteDialogComponent]
      })
        .overrideTemplate(SeasonDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeasonDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeasonService);
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
