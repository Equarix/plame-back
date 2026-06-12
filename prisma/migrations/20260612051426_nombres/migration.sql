/*
  Warnings:

  - Added the required column `apellidoMaterno` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellidoPaterno` to the `Persona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Persona" (
    "personaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dni" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Persona" ("createdAt", "dni", "estado", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "sexo") SELECT "createdAt", "dni", "estado", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "sexo" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
