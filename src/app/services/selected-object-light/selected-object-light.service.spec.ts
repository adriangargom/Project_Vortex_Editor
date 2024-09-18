import { TestBed } from '@angular/core/testing';

import { SelectedObjectLightService } from './selected-object-light.service';

describe('SelectedObjectLightService', () => {
  let service: SelectedObjectLightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedObjectLightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
