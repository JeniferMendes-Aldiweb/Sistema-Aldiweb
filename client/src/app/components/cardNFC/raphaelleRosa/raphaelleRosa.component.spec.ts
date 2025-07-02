import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaphaelleRosaComponent } from './raphaelleRosa.component';

describe('RaphaelleRosaComponent', () => {
  let component: RaphaelleRosaComponent;
  let fixture: ComponentFixture<RaphaelleRosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaphaelleRosaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaphaelleRosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
