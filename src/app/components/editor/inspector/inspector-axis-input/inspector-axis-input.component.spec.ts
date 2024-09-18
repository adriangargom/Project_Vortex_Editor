import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorAxisInputComponent } from './inspector-axis-input.component';

describe('InspectorAxisInputComponent', () => {
  let component: InspectorAxisInputComponent;
  let fixture: ComponentFixture<InspectorAxisInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorAxisInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorAxisInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
