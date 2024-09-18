import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAddMenuComponent } from './top-add-menu.component';

describe('TopAddMenuComponent', () => {
  let component: TopAddMenuComponent;
  let fixture: ComponentFixture<TopAddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAddMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
