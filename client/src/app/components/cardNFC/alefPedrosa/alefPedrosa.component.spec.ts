import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlefPedrosaComponent } from './alefPedrosa.component';

describe('AlefPedrosaComponent', () => {
  let component: AlefPedrosaComponent;
  let fixture: ComponentFixture<AlefPedrosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlefPedrosaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlefPedrosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
