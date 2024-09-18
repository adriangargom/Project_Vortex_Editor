import { TestBed } from '@angular/core/testing';

import { ObjectExporterService } from './object-exporter.service';

describe('ObjectExporterService', () => {
  let service: ObjectExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
