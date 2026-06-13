/*
  Warnings:

  - Added the required column `fechaIngreso` to the `TPersona` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TPersona" (
    "tPersonaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "personaId" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
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
    "codlocal" TEXT,
    "local" TEXT,
    "jornadaLaboral" TEXT,
    "situacionEspecial" TEXT,
    "discapacidad" BOOLEAN NOT NULL DEFAULT false,
    "sindicalizado" BOOLEAN NOT NULL DEFAULT false,
    "regimenSalud" TEXT NOT NULL,
    "fechaInicioSalud" DATETIME NOT NULL,
    "fechaFinSalud" DATETIME,
    "regimenPensionario" TEXT NOT NULL,
    "fechaInicioPensionario" DATETIME NOT NULL,
    "fechaFinPensionario" DATETIME,
    "CUSPP" TEXT,
    "sctr" BOOLEAN NOT NULL DEFAULT false,
    "pension" TEXT,
    "salud" TEXT,
    "fechaInicioSaludPension" DATETIME,
    "fechaFinSaludPension" DATETIME,
    "situacionEducativaId" INTEGER NOT NULL,
    "quintaCategoriaExonerada" BOOLEAN NOT NULL DEFAULT false,
    "evitaDobleImposicion" BOOLEAN NOT NULL DEFAULT false,
    "tEmpresaCompanyId" INTEGER,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "fechaIngreso" DATETIME NOT NULL,
    CONSTRAINT "TPersona_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("personaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_ocupacionId_fkey" FOREIGN KEY ("ocupacionId") REFERENCES "Ocupacion" ("ocupacionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_entidadId_fkey" FOREIGN KEY ("entidadId") REFERENCES "Entidades" ("entidadId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TPersona_situacionEducativaId_fkey" FOREIGN KEY ("situacionEducativaId") REFERENCES "SituacionesEducativas" ("situacionEducativaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TPersona_tEmpresaCompanyId_fkey" FOREIGN KEY ("tEmpresaCompanyId") REFERENCES "TEmpresa" ("companyId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TPersona_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TPersona" ("CUSPP", "categoria", "codlocal", "createAt", "cuentaBancaria", "discapacidad", "email", "entidadId", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaFinSaludPension", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "fechaInicioSaludPension", "jornadaLaboral", "local", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "pension", "periodoFin", "periodoIngreso", "periodoInicio", "personaId", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "salud", "sctr", "sindicalizado", "situacionEducativaId", "situacionEspecial", "tEmpresaCompanyId", "tPersonaId", "telefono", "tipoContrato", "tipoPago", "tipoTrabajador", "userId") SELECT "CUSPP", "categoria", "codlocal", "createAt", "cuentaBancaria", "discapacidad", "email", "entidadId", "evitaDobleImposicion", "fechaFinPensionario", "fechaFinSalud", "fechaFinSaludPension", "fechaInicio", "fechaInicioPensionario", "fechaInicioSalud", "fechaInicioSaludPension", "jornadaLaboral", "local", "montoRemuneracionInicial", "motivoBaja", "motivoBajaTrabajador", "ocupacionId", "otroPeriodoIngreso", "otroRegimenLaboral", "otroTipoContrato", "otroTipoPago", "pension", "periodoFin", "periodoIngreso", "periodoInicio", "personaId", "quintaCategoriaExonerada", "regimenLaboral", "regimenPensionario", "regimenSalud", "salud", "sctr", "sindicalizado", "situacionEducativaId", "situacionEspecial", "tEmpresaCompanyId", "tPersonaId", "telefono", "tipoContrato", "tipoPago", "tipoTrabajador", "userId" FROM "TPersona";
DROP TABLE "TPersona";
ALTER TABLE "new_TPersona" RENAME TO "TPersona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
