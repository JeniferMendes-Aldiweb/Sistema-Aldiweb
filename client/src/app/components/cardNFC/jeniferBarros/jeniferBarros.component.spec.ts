import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeniferBarrosComponent } from './jeniferBarros.component';

describe('JeniferBarrosComponent', () => {
  let component: JeniferBarrosComponent;
  let fixture: ComponentFixture<JeniferBarrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeniferBarrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JeniferBarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
