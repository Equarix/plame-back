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
    "primeraDireccion" TEXT NOT NULL,
    "segundaDireccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Persona" ("dni", "email", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "primeraDireccion", "segundaDireccion", "sexo", "telefono") SELECT "dni", "email", "estadoCivil", "fechaNacimiento", "nacionalidad", "personaId", "primeraDireccion", "segundaDireccion", "sexo", "telefono" FROM "Persona";
DROP TABLE "Persona";
ALTER TABLE "new_Persona" RENAME TO "Persona";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
