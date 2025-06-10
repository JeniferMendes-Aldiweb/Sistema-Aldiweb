import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriellyMarianyComponent } from './driellyMariany.component';

describe('DriellyMarianyComponent', () => {
  let component: DriellyMarianyComponent;
  let fixture: ComponentFixture<DriellyMarianyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriellyMarianyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriellyMarianyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
