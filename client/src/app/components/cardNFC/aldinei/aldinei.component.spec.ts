import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AldineiComponent } from './aldinei.component';

describe('AldineiComponent', () => {
  let component: AldineiComponent;
  let fixture: ComponentFixture<AldineiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AldineiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AldineiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
