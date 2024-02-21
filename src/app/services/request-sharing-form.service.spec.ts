import { TestBed } from '@angular/core/testing';

import { RequestSharingFormService } from './request-sharing-form.service';

describe('RequestSharingFormService', () => {
  let service: RequestSharingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSharingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
