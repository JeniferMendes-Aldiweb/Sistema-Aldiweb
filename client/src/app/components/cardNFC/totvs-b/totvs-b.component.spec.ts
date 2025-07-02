import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotvsBComponent } from './totvs-b.component';

describe('TotvsBComponent', () => {
  let component: TotvsBComponent;
  let fixture: ComponentFixture<TotvsBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotvsBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotvsBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
