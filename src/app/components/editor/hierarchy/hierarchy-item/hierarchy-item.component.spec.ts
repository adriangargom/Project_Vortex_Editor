import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyItemComponent } from './hierarchy-item.component';

describe('HierarchyItemComponent', () => {
  let component: HierarchyItemComponent;
  let fixture: ComponentFixture<HierarchyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
