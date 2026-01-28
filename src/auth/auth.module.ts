import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [UsersModule, JwtModule.register(
//     {secret: process.env.JWT_SECRET,
//       global: true,
//       signOptions: { expiresIn: '60d' },
//     }
//   ), ], 
//   controllers: [AuthController],
//   providers: [AuthService]
// })
// export class AuthModule {}

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

