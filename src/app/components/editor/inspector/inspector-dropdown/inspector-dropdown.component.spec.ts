import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorDropdownComponent } from './inspector-dropdown.component';

describe('InspectorDropdownComponent', () => {
  let component: InspectorDropdownComponent;
  let fixture: ComponentFixture<InspectorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectorDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
