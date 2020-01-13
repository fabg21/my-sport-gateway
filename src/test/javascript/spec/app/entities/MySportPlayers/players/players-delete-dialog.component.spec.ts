import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MySportGatewayTestModule } from '../../../../test.module';
import { PlayersDeleteDialogComponent } from 'app/entities/MySportPlayers/players/players-delete-dialog.component';
import { PlayersService } from 'app/entities/MySportPlayers/players/players.service';

describe('Component Tests', () => {
  describe('Players Management Delete Component', () => {
    let comp: PlayersDeleteDialogComponent;
    let fixture: ComponentFixture<PlayersDeleteDialogComponent>;
    let service: PlayersService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [PlayersDeleteDialogComponent]
      })
        .overrideTemplate(PlayersDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlayersDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayersService);
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
