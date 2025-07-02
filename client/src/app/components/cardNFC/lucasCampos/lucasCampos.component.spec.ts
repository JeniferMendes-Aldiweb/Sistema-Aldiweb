import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucasCamposComponent } from './lucasCampos.component';

describe('LucasCamposComponent', () => {
  let component: LucasCamposComponent;
  let fixture: ComponentFixture<LucasCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucasCamposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LucasCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
