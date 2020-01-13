import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySportGatewayTestModule } from '../../../../test.module';
import { IncomingsDeleteDialogComponent } from 'app/entities/mySportFinancial/incomings/incomings-delete-dialog.component';
import { IncomingsService } from 'app/entities/mySportFinancial/incomings/incomings.service';

describe('Component Tests', () => {
  describe('Incomings Management Delete Component', () => {
    let comp: IncomingsDeleteDialogComponent;
    let fixture: ComponentFixture<IncomingsDeleteDialogComponent>;
    let service: IncomingsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [IncomingsDeleteDialogComponent]
      })
        .overrideTemplate(IncomingsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IncomingsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IncomingsService);
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
