import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySportGatewayTestModule } from '../../../../test.module';
import { SpendingDeleteDialogComponent } from 'app/entities/mySportFinancial/spending/spending-delete-dialog.component';
import { SpendingService } from 'app/entities/mySportFinancial/spending/spending.service';

describe('Component Tests', () => {
  describe('Spending Management Delete Component', () => {
    let comp: SpendingDeleteDialogComponent;
    let fixture: ComponentFixture<SpendingDeleteDialogComponent>;
    let service: SpendingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [SpendingDeleteDialogComponent]
      })
        .overrideTemplate(SpendingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpendingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpendingService);
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
