import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RafaelGranjaComponent } from './rafaelGranja.component';

describe('RafaelGranjaComponent', () => {
  let component: RafaelGranjaComponent;
  let fixture: ComponentFixture<RafaelGranjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RafaelGranjaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RafaelGranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
