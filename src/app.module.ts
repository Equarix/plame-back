import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TEmpresaModule } from './modules/t-empresa/t-empresa.module';
import { OcupacionModule } from './modules/ocupacion/ocupacion.module';
import { EntidadBancariaModule } from './modules/entidad-bancaria/entidad-bancaria.module';
import { SituacionesAcademicasModule } from './modules/situaciones-academicas/situaciones-academicas.module';
import { PersonaModule } from './modules/persona/persona.module';
import { TPersonaModule } from './modules/t-persona/t-persona.module';
import { UbigeoModule } from './modules/ubigeo/ubigeo.module';
import { PlameModule } from './modules/plame/plame.module';
import { ConceptosModule } from './modules/conceptos/conceptos.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, TEmpresaModule, OcupacionModule, EntidadBancariaModule, SituacionesAcademicasModule, PersonaModule, TPersonaModule, UbigeoModule, PlameModule, ConceptosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
