import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSceneFogMenuComponent } from './top-scene-fog-menu.component';

describe('TopSceneFogMenuComponent', () => {
  let component: TopSceneFogMenuComponent;
  let fixture: ComponentFixture<TopSceneFogMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSceneFogMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSceneFogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
