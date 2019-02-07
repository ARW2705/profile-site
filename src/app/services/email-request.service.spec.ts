import { TestBed, inject } from '@angular/core/testing';

import { EmailRequestService } from './email-request.service';

describe('EmailRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailRequestService]
    });
  });

  it('should be created', inject([EmailRequestService], (service: EmailRequestService) => {
    expect(service).toBeTruthy();
  }));
});
