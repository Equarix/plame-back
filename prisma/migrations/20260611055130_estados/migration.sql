-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SituacionesEducativas" (
    "situacionEducativaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "requiereEstudios" BOOLEAN NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SituacionesEducativas" ("nombre", "requiereEstudios", "situacionEducativaId") SELECT "nombre", "requiereEstudios", "situacionEducativaId" FROM "SituacionesEducativas";
DROP TABLE "SituacionesEducativas";
ALTER TABLE "new_SituacionesEducativas" RENAME TO "SituacionesEducativas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
