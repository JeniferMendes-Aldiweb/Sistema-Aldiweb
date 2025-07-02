import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanessaComponent } from './wanessa.component';

describe('WanessaComponent', () => {
  let component: WanessaComponent;
  let fixture: ComponentFixture<WanessaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WanessaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WanessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
