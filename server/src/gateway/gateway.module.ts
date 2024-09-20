import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [AuthModule, UsersModule,
        SessionModule,
        PassportModule,
        MailModule,
        JwtModule.register({}),],
    providers: [MyGateway, AuthService],
})
export class GatewayModule { }
