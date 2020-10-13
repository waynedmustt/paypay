import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const matchRoles = (roles, role) => {
      return roles.indexOf(role) !== -1;
    };

    if (!request || !request.user) {
      throw new ForbiddenException();
    }
    const role = request.user && request.user.role;
    return matchRoles(roles, role);
  }
}
