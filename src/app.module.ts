import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/profile.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './helpers/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Profile],
        migrations: [],
        migrationsTableName: 'migrations',
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
