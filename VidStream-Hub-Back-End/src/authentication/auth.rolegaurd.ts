import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate {
  constructor() {}

  /**
   * Method to determine if the user has the required role to access the resource
   * @param context - ExecutionContext object
   * @returns boolean indicating whether the user has the required role
   * @throws UnauthorizedException if the user does not have the required role
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    const ctx = context.switchToHttp();
    const req: any = ctx.getRequest<Request>();

    if (!req.user || !req.user.isAdmin) {
      throw new UnauthorizedException("You don't have permission");
    }
    return true;
  }
}
