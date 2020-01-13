import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { SpendingDetailComponent } from 'app/entities/mySportFinancial/spending/spending-detail.component';
import { Spending } from 'app/shared/model/mySportFinancial/spending.model';

describe('Component Tests', () => {
  describe('Spending Management Detail Component', () => {
    let comp: SpendingDetailComponent;
    let fixture: ComponentFixture<SpendingDetailComponent>;
    const route = ({ data: of({ spending: new Spending(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [SpendingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SpendingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpendingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.spending).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
