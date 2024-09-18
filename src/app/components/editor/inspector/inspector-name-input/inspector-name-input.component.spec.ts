import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorNameInputComponent } from './inspector-name-input.component';

describe('InspectorNameInputComponent', () => {
  let component: InspectorNameInputComponent;
  let fixture: ComponentFixture<InspectorNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorNameInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
