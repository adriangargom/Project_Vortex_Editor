import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAddMenuItemComponent } from './top-add-menu-item.component';

describe('TopAddMenuItemComponent', () => {
  let component: TopAddMenuItemComponent;
  let fixture: ComponentFixture<TopAddMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAddMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAddMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
