import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KellyCardosoComponent } from './kellyCardoso.component';

describe('KellyCardosoComponent', () => {
  let component: KellyCardosoComponent;
  let fixture: ComponentFixture<KellyCardosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KellyCardosoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KellyCardosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
