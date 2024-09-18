import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsToolBarComponent } from './controls-tool-bar.component';

describe('ControlsToolBarComponent', () => {
  let component: ControlsToolBarComponent;
  let fixture: ComponentFixture<ControlsToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsToolBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
