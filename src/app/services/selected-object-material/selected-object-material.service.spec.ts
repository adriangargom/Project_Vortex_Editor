import { TestBed } from '@angular/core/testing';

import { SelectedObjectMaterialService } from './selected-object-material.service';

describe('SelectedObjectMaterialService', () => {
  let service: SelectedObjectMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedObjectMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
