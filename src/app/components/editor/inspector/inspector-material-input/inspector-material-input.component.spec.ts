import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorMaterialInputComponent } from './inspector-material-input.component';

describe('InspectorMaterialInputComponent', () => {
  let component: InspectorMaterialInputComponent;
  let fixture: ComponentFixture<InspectorMaterialInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorMaterialInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorMaterialInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
