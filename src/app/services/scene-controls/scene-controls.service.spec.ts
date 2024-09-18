import { TestBed } from '@angular/core/testing';

import { SceneControlsService } from './scene-controls.service';

describe('SceneControlsService', () => {
  let service: SceneControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
