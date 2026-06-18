-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlameDeclaracion" (
    "plameDeclaracionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "sustitutoria" BOOLEAN NOT NULL DEFAULT false,
    "numeroOrden" TEXT,
    "fechaPresentacion" DATETIME,
    "estado" TEXT NOT NULL DEFAULT 'En Proceso',
    "totalNetoAPagar" REAL NOT NULL DEFAULT 0.0,
    "creditoEps602" REAL NOT NULL DEFAULT 0.0,
    "creditoEps612" REAL NOT NULL DEFAULT 0.0,
    "otrasDeducciones605" REAL NOT NULL DEFAULT 0.0,
    "pagosPreviosSNP" REAL NOT NULL DEFAULT 0.0,
    "pagosPreviosEsSalud" REAL NOT NULL DEFAULT 0.0,
    "pagosPreviosRenta" REAL NOT NULL DEFAULT 0.0,
    "interesSNP" REAL NOT NULL DEFAULT 0.0,
    "interesEsSalud" REAL NOT NULL DEFAULT 0.0,
    "interesRenta" REAL NOT NULL DEFAULT 0.0,
    "importePagarSNP" REAL NOT NULL DEFAULT 0.0,
    "importePagarEsSalud" REAL NOT NULL DEFAULT 0.0,
    "importePagarRenta" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlameDeclaracion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "TEmpresa" ("companyId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlameDeclaracion" ("companyId", "createdAt", "estado", "fechaPresentacion", "numeroOrden", "periodo", "plameDeclaracionId", "sustitutoria", "totalNetoAPagar") SELECT "companyId", "createdAt", "estado", "fechaPresentacion", "numeroOrden", "periodo", "plameDeclaracionId", "sustitutoria", "totalNetoAPagar" FROM "PlameDeclaracion";
DROP TABLE "PlameDeclaracion";
ALTER TABLE "new_PlameDeclaracion" RENAME TO "PlameDeclaracion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
