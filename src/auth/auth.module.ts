import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UsersModule, JwtModule.register(
    {secret: 'secured',
      global: true,
      signOptions: { expiresIn: '60d' },
    }
  ), ], 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
