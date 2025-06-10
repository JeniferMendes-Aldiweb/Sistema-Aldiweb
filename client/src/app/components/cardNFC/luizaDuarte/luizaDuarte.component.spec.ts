import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuizaDuarteComponent } from './luizaDuarte.component';

describe('LuizaDuarteComponent', () => {
  let component: LuizaDuarteComponent;
  let fixture: ComponentFixture<LuizaDuarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuizaDuarteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LuizaDuarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
