import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MySportGatewayTestModule } from '../../../../test.module';
import { IncomingsUpdateComponent } from 'app/entities/mySportFinancial/incomings/incomings-update.component';
import { IncomingsService } from 'app/entities/mySportFinancial/incomings/incomings.service';
import { Incomings } from 'app/shared/model/mySportFinancial/incomings.model';

describe('Component Tests', () => {
  describe('Incomings Management Update Component', () => {
    let comp: IncomingsUpdateComponent;
    let fixture: ComponentFixture<IncomingsUpdateComponent>;
    let service: IncomingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MySportGatewayTestModule],
        declarations: [IncomingsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IncomingsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IncomingsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IncomingsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Incomings(123);
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
        const entity = new Incomings();
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
