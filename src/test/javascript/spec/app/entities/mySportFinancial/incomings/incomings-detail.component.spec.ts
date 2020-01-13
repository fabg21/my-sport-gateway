import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { IncomingsDetailComponent } from 'app/entities/mySportFinancial/incomings/incomings-detail.component';
import { Incomings } from 'app/shared/model/mySportFinancial/incomings.model';

describe('Component Tests', () => {
  describe('Incomings Management Detail Component', () => {
    let comp: IncomingsDetailComponent;
    let fixture: ComponentFixture<IncomingsDetailComponent>;
    const route = ({ data: of({ incomings: new Incomings(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [IncomingsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IncomingsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IncomingsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.incomings).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
