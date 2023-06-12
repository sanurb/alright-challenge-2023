import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { HAS_ROLE_KEY } from '../decorators/has-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      HAS_ROLE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      throw new UnauthorizedException('User roles not found');
    }

    const hasRole = () =>
      requiredRoles.some((role) => user.roles?.includes(role));

    if (!hasRole()) {
      throw new UnauthorizedException('User does not have required roles');
    }

    return true;
  }
}
