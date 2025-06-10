import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillippiComponent } from './fillippi.component';

describe('FillippiComponent', () => {
  let component: FillippiComponent;
  let fixture: ComponentFixture<FillippiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillippiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FillippiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
