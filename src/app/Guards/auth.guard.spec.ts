import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterModule],
    });
  });

  it('should ...', async(
    inject([AuthGuard], (guard: AuthGuard, router: Router) => {
      expect(guard).toBeTruthy();
      expect(router).toBeTruthy();
    }),
  ));
});
