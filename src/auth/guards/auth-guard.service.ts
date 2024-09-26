import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';

  
  @Injectable()
  export class  AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly reflector: Reflector
      
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const isPublic = this.reflector.getAllAndOverride<Boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass()
      ]);

      const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY , [
        context.getHandler(),
        context.getClass()
      ]);

      if(isPublic){
        return true
      }

      
      const request = context.switchToHttp().getRequest();

      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try { 
        const payload = await this.jwtService.verifyAsync(token);

        if(roles){
          const isTrue = roles.some((role) => role === payload.role )

          if(!isTrue){
            throw new Error
          }
        }

        

        request.user  = payload;
  
         
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : type;
    }
  }