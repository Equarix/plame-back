-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TEmpresa" (
    "companyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_TEmpresa" ("address", "companyId", "name", "ruc") SELECT "address", "companyId", "name", "ruc" FROM "TEmpresa";
DROP TABLE "TEmpresa";
ALTER TABLE "new_TEmpresa" RENAME TO "TEmpresa";
CREATE TABLE "new_TPersona" (
    "tPersonaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "primeraDireccion" TEXT NOT NULL,
    "segundaDireccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
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
    CONSTRAINT "TPersona_ocupacionId_fkey" FOREIGN KEY ("ocupacionId") REFERENCES "Ocupacion" ("ocupacionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidades" ("entidadId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TPersona_situacionEducativaId_fkey" FOREIGN KEY ("situacionEducativaId") REFERENCES "SituacionesEducativas" ("situacionEducativaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_tEmpresaCompanyId_fkey" FOREIGN KEY ("tEmpresaCompanyId") REFERENCES "TEmpresa" ("companyId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TPersona" ("CUSPP", "categoria", "cuentaBancaria", "dni", "email", "entidadId", "estadoCivil", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "fechaNacimiento", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "nacionalidad", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "periodoFin", "periodoIngreso", "periodoInicio", "primeraDireccion", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "sctr", "segundaDireccion", "sexo", "situacionEducativaId", "tPersonaId", "telefono", "tipoContrato", "tipoPago", "tipoTrabajador") SELECT "CUSPP", "categoria", "cuentaBancaria", "dni", "email", "entidadId", "estadoCivil", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "fechaNacimiento", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "nacionalidad", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "periodoFin", "periodoIngreso", "periodoInicio", "primeraDireccion", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "sctr", "segundaDireccion", "sexo", "situacionEducativaId", "tPersonaId", "telefono", "tipoContrato", "tipoPago", "tipoTrabajador" FROM "TPersona";
DROP TABLE "TPersona";
ALTER TABLE "new_TPersona" RENAME TO "TPersona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
