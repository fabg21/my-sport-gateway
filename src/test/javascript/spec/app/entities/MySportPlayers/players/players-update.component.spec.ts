import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { PlayersUpdateComponent } from 'app/entities/MySportPlayers/players/players-update.component';
import { PlayersService } from 'app/entities/MySportPlayers/players/players.service';
import { Players } from 'app/shared/model/MySportPlayers/players.model';

describe('Component Tests', () => {
  describe('Players Management Update Component', () => {
    let comp: PlayersUpdateComponent;
    let fixture: ComponentFixture<PlayersUpdateComponent>;
    let service: PlayersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [PlayersUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlayersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Players(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Players();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
