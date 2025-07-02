import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotvsAComponent } from './totvs-a.component';

describe('TotvsAComponent', () => {
  let component: TotvsAComponent;
  let fixture: ComponentFixture<TotvsAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotvsAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotvsAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
