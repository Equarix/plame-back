-- CreateTable
CREATE TABLE "TEmpresaConceptos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tEmpresaCompanyId" INTEGER NOT NULL,
    "conceptoId" INTEGER NOT NULL,
    CONSTRAINT "TEmpresaConceptos_tEmpresaCompanyId_fkey" FOREIGN KEY ("tEmpresaCompanyId") REFERENCES "TEmpresa" ("companyId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TEmpresaConceptos_conceptoId_fkey" FOREIGN KEY ("conceptoId") REFERENCES "TConceptos" ("conceptoId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TConceptos" (
    "conceptoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "subTipo" TEXT,
    "porcentaje" REAL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
