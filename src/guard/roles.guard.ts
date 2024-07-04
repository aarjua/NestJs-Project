import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator'; // Import the key used in the decorator

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    console.log(roles, "roles");
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user, "request");
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(requiredRoles: string[], userRoles: string[]): boolean {
  // Check if userRoles array contains at least one of the requiredRoles
  return requiredRoles.some(role => userRoles.includes(role));
}