import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionToolBarComponent } from './position-tool-bar.component';

describe('PositionToolBarComponent', () => {
  let component: PositionToolBarComponent;
  let fixture: ComponentFixture<PositionToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
