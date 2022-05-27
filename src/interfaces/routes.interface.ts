import { Router } from 'express';

export interface RoutesI {
  path?: string;
  router: Router;
}
