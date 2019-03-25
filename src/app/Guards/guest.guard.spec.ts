import { TestBed, async, inject } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { Router, RouterModule } from '@angular/router';
describe('GuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestGuard],
    });
  });

  it('should ...', async(
    inject([GuestGuard], (guard: GuestGuard) => {
      expect(guard).toBeTruthy();
    }),
  ));
});
