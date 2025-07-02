import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotvsCComponent } from './totvs-c.component';

describe('TotvsCComponent', () => {
  let component: TotvsCComponent;
  let fixture: ComponentFixture<TotvsCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotvsCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotvsCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
