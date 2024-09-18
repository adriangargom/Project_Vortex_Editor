import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorLightInputComponent } from './inspector-light-input.component';

describe('InspectorLightInputComponent', () => {
  let component: InspectorLightInputComponent;
  let fixture: ComponentFixture<InspectorLightInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorLightInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorLightInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
