/*
  Warnings:

  - You are about to drop the column `email` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `primeraDireccion` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `segundaDireccion` on the `Persona` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Persona` table. All the data in the column will be lost.
  - Added the required column `email` to the `TPersona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `TPersona` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Pais" (
    "idPais" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pais" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departamento" (
    "idDepartamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departamento" TEXT NOT NULL,
    "idPais" INTEGER NOT NULL,
    CONSTRAINT "Departamento_idPais_fkey" FOREIGN KEY ("idPais") REFERENCES "Pais" ("idPais") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Provincia" (
    "idProvincia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provincia" TEXT NOT NULL,
    "idDepartamento" INTEGER NOT NULL,
    CONSTRAINT "Provincia_idDepartamento_fkey" FOREIGN KEY ("idDepartamento") REFERENCES "Departamento" ("idDepartamento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distrito" (
    "idDistrito" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distrito" TEXT NOT NULL,
    "idProvincia" INTEGER NOT NULL,
    CONSTRAINT "Distrito_idProvincia_fkey" FOREIGN KEY ("idProvincia") REFERENCES "Provincia" ("idProvincia") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Direccion" (
    "direccionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personaId" INTEGER NOT NULL,
    "departamentoId" INTEGER NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "distritoId" INTEGER NOT NULL,
    "tipoVia" TEXT NOT NULL,
    "personaPersonaId" INTEGER,
    "nombreVia" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "dpto" TEXT,
    "interior" TEXT,
    "manzana" TEXT,
    "lote" TEXT,
    "block" TEXT,
    "etapa" TEXT,
    "tipoZona" TEXT NOT NULL,
    "nombreZona" TEXT NOT NULL,
    "referencia" TEXT,
    "refiereEssalud" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Direccion_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento" ("idDepartamento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Direccion_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia" ("idProvincia") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Direccion_distritoId_fkey" FOREIGN KEY ("distritoId") REFERENCES "Distrito" ("idDistrito") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Direccion_personaPersonaId_fkey" FOREIGN KEY ("personaPersonaId") REFERENCES "Persona" ("personaId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persona" (
    "personaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Persona" ("dni", "estado", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "sexo") SELECT "dni", "estado", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "sexo" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
CREATE TABLE "new_TPersona" (
    "tPersonaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personaId" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "segundaDireccionId" INTEGER,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "periodoInicio" DATETIME NOT NULL,
    "periodoFin" DATETIME,
    "motivoBaja" TEXT,
    "tipoTrabajador" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "motivoBajaTrabajador" TEXT,
    "regimenLaboral" TEXT NOT NULL,
    "otroRegimenLaboral" TEXT,
    "ocupacionId" INTEGER NOT NULL,
    "tipoContrato" TEXT NOT NULL,
    "otroTipoContrato" TEXT,
    "tipoPago" TEXT NOT NULL,
    "otroTipoPago" TEXT,
    "periodoIngreso" TEXT NOT NULL,
    "otroPeriodoIngreso" TEXT,
    "entidadId" INTEGER,
    "cuentaBancaria" TEXT,
    "montoRemuneracionInicial" REAL NOT NULL,
    "regimenSalud" TEXT NOT NULL,
    "fechaInicioSalud" DATETIME NOT NULL,
    "fechaFinSalud" DATETIME,
    "regimenPensionario" TEXT NOT NULL,
    "fechaInicioPensionario" DATETIME NOT NULL,
    "fechaFinPensionario" DATETIME,
    "CUSPP" TEXT,
    "sctr" BOOLEAN NOT NULL DEFAULT false,
    "situacionEducativaId" INTEGER NOT NULL,
    "quintaCategoriaExonerada" BOOLEAN NOT NULL DEFAULT false,
    "evitaDobleImposicion" BOOLEAN NOT NULL DEFAULT false,
    "tEmpresaCompanyId" INTEGER,
    CONSTRAINT "TPersona_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("personaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_segundaDireccionId_fkey" FOREIGN KEY ("segundaDireccionId") REFERENCES "Direccion" ("direccionId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TPersona_ocupacionId_fkey" FOREIGN KEY ("ocupacionId") REFERENCES "Ocupacion" ("ocupacionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidades" ("entidadId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TPersona_situacionEducativaId_fkey" FOREIGN KEY ("situacionEducativaId") REFERENCES "SituacionesEducativas" ("situacionEducativaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_tEmpresaCompanyId_fkey" FOREIGN KEY ("tEmpresaCompanyId") REFERENCES "TEmpresa" ("companyId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TPersona" ("CUSPP", "categoria", "cuentaBancaria", "entidadId", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "periodoFin", "periodoIngreso", "periodoInicio", "personaId", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "sctr", "situacionEducativaId", "tEmpresaCompanyId", "tPersonaId", "tipoContrato", "tipoPago", "tipoTrabajador") SELECT "CUSPP", "categoria", "cuentaBancaria", "entidadId", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "periodoFin", "periodoIngreso", "periodoInicio", "personaId", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "sctr", "situacionEducativaId", "tEmpresaCompanyId", "tPersonaId", "tipoContrato", "tipoPago", "tipoTrabajador" FROM "TPersona";
DROP TABLE "TPersona";
ALTER TABLE "new_TPersona" RENAME TO "TPersona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
