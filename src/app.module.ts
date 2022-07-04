import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/profile.entity';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './env.helper';

const envFilePath: string = getEnvPath(`${__dirname}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true
    }),
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'apirest_nestjs',
      entities: [User, Profile],
      migrations: [],
      migrationsTableName: 'migrations',
      synchronize: true
    }),
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
