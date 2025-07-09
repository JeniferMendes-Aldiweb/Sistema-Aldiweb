import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanLeadsComponent } from './kanbanLeads.component';

describe('KanbanLeadsComponent', () => {
  let component: KanbanLeadsComponent;
  let fixture: ComponentFixture<KanbanLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanbanLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
