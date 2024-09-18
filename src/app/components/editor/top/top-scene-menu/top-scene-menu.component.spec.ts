import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSceneMenuComponent } from './top-scene-menu.component';

describe('TopSceneMenuComponent', () => {
  let component: TopSceneMenuComponent;
  let fixture: ComponentFixture<TopSceneMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSceneMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSceneMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
