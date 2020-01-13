import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { PlayersDetailComponent } from 'app/entities/MySportPlayers/players/players-detail.component';
import { Players } from 'app/shared/model/MySportPlayers/players.model';

describe('Component Tests', () => {
  describe('Players Management Detail Component', () => {
    let comp: PlayersDetailComponent;
    let fixture: ComponentFixture<PlayersDetailComponent>;
    const route = ({ data: of({ players: new Players(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [PlayersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlayersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlayersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.players).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
