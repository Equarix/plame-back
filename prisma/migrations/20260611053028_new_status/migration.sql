-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entidades" (
    "entidadId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Entidades" ("entidadId", "name") SELECT "entidadId", "name" FROM "Entidades";
DROP TABLE "Entidades";
ALTER TABLE "new_Entidades" RENAME TO "Entidades";
CREATE TABLE "new_Ocupacion" (
    "ocupacionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ocupacion" ("name", "ocupacionId") SELECT "name", "ocupacionId" FROM "Ocupacion";
DROP TABLE "Ocupacion";
ALTER TABLE "new_Ocupacion" RENAME TO "Ocupacion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
