import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RafaelRamalhoComponent } from './rafaelRamalho.component';

describe('RafaelRamalhoComponent', () => {
  let component: RafaelRamalhoComponent;
  let fixture: ComponentFixture<RafaelRamalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RafaelRamalhoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RafaelRamalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
