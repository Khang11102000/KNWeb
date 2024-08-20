import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSource, DataSourceOptions } from 'typeorm';

import databaseConfig from './database/config/database.config';
import { DatabaseConfig } from './database/config/database-config.type';
import { MongooseConfigService } from './database/mongoose-config.service';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import fileConfig from './files/config/file.config';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { SessionModule } from './session/session.module';
import { HomeModule } from './home/home.module';

// <database-block>
const infrastructureDatabaseModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    })
  : TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    });
// </database-block>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        // facebookConfig,
        // googleConfig,
        // twitterConfig,
        // appleConfig,
      ],
      envFilePath: '.env',
    }),
    infrastructureDatabaseModule,
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService<AllConfigType>) => ({
    //     fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
    //       infer: true,
    //     }),
    //     loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
    //   }),
    //   resolvers: [
    //     {
    //       use: HeaderResolver,
    //       useFactory: (configService: ConfigService<AllConfigType>) => {
    //         return [
    //           configService.get('app.headerLanguage', {
    //             infer: true,
    //           }),
    //         ];
    //       },
    //       inject: [ConfigService],
    //     },
    //   ],
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    // }),
    AuthModule,
    UsersModule,
    FilesModule,
    // AuthFacebookModule,
    // AuthGoogleModule,
    // AuthTwitterModule,
    // AuthAppleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
