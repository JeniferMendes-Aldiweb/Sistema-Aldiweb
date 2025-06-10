import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabioTuratiComponent } from './fabioTurati.component';

describe('FabioTuratiComponent', () => {
  let component: FabioTuratiComponent;
  let fixture: ComponentFixture<FabioTuratiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabioTuratiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FabioTuratiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
