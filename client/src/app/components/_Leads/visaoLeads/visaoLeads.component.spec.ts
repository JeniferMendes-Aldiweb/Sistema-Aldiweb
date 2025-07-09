import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoLeadsComponent } from './visaoLeads.component';

describe('VisaoLeadsComponent', () => {
  let component: VisaoLeadsComponent;
  let fixture: ComponentFixture<VisaoLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaoLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisaoLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
