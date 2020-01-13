import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MySportGatewayTestModule } from '../../../../test.module';
import { PlayersComponent } from 'app/entities/MySportPlayers/players/players.component';
import { PlayersService } from 'app/entities/MySportPlayers/players/players.service';
import { Players } from 'app/shared/model/MySportPlayers/players.model';

describe('Component Tests', () => {
  describe('Players Management Component', () => {
    let comp: PlayersComponent;
    let fixture: ComponentFixture<PlayersComponent>;
    let service: PlayersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [PlayersComponent],
        providers: []
      })
        .overrideTemplate(PlayersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlayersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlayersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Players(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.players[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
