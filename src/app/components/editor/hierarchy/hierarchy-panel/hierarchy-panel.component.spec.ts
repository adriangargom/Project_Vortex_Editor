import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyPanelComponent } from './hierarchy-panel.component';

describe('HierarchyPanelComponent', () => {
  let component: HierarchyPanelComponent;
  let fixture: ComponentFixture<HierarchyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
