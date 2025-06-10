import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HenriqueVasconcelosComponent } from './henriqueVasconcelos.component';

describe('HenriqueVasconcelosComponent', () => {
  let component: HenriqueVasconcelosComponent;
  let fixture: ComponentFixture<HenriqueVasconcelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HenriqueVasconcelosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HenriqueVasconcelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
