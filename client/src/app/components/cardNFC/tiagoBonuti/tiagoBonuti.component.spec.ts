import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiagoBonutiComponent } from './tiagoBonuti.component';

describe('TiagoBonutiComponent', () => {
  let component: TiagoBonutiComponent;
  let fixture: ComponentFixture<TiagoBonutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiagoBonutiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiagoBonutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
