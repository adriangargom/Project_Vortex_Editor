import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFileMenuComponent } from './top-file-menu.component';

describe('TopFileMenuComponent', () => {
  let component: TopFileMenuComponent;
  let fixture: ComponentFixture<TopFileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopFileMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
