import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { SpendingUpdateComponent } from 'app/entities/mySportFinancial/spending/spending-update.component';
import { SpendingService } from 'app/entities/mySportFinancial/spending/spending.service';
import { Spending } from 'app/shared/model/mySportFinancial/spending.model';

describe('Component Tests', () => {
  describe('Spending Management Update Component', () => {
    let comp: SpendingUpdateComponent;
    let fixture: ComponentFixture<SpendingUpdateComponent>;
    let service: SpendingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [SpendingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SpendingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpendingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpendingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Spending(123);
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
        const entity = new Spending();
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
