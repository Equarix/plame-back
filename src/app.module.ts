import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TEmpresaModule } from './modules/t-empresa/t-empresa.module';
import { OcupacionModule } from './modules/ocupacion/ocupacion.module';
import { EntidadBancariaModule } from './modules/entidad-bancaria/entidad-bancaria.module';
import { SituacionesAcademicasModule } from './modules/situaciones-academicas/situaciones-academicas.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TEmpresaModule, OcupacionModule, EntidadBancariaModule, SituacionesAcademicasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
