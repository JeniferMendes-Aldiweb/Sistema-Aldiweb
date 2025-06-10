import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoaoHenriqueComponent } from './joaoHenrique.component';


describe('JoaoHenriqueComponent', () => {
  let component: JoaoHenriqueComponent;
  let fixture: ComponentFixture<JoaoHenriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoaoHenriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoaoHenriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
