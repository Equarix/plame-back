/*
  Warnings:

  - You are about to drop the column `personaId` on the `Direccion` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Direccion" (
    "direccionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Direccion" ("block", "departamentoId", "direccionId", "distritoId", "dpto", "etapa", "interior", "lote", "manzana", "nombreVia", "nombreZona", "numero", "personaPersonaId", "provinciaId", "referencia", "refiereEssalud", "tipoVia", "tipoZona") SELECT "block", "departamentoId", "direccionId", "distritoId", "dpto", "etapa", "interior", "lote", "manzana", "nombreVia", "nombreZona", "numero", "personaPersonaId", "provinciaId", "referencia", "refiereEssalud", "tipoVia", "tipoZona" FROM "Direccion";
DROP TABLE "Direccion";
ALTER TABLE "new_Direccion" RENAME TO "Direccion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
