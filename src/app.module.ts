import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TEmpresaModule } from './modules/t-empresa/t-empresa.module';
import { OcupacionModule } from './modules/ocupacion/ocupacion.module';
import { EntidadBancariaModule } from './modules/entidad-bancaria/entidad-bancaria.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TEmpresaModule, OcupacionModule, EntidadBancariaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
