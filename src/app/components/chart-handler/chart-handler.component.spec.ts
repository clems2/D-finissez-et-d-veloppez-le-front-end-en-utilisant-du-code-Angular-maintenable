import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHandlerComponent } from './chart-handler.component';

describe('ChartHandlerComponent', () => {
  let component: ChartHandlerComponent;
  let fixture: ComponentFixture<ChartHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
