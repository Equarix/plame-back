-- CreateTable
CREATE TABLE "PlameDeclaracion" (
    "plameDeclaracionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "companyId" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "sustitutoria" BOOLEAN NOT NULL DEFAULT false,
    "numeroOrden" TEXT,
    "fechaPresentacion" DATETIME,
    "estado" TEXT NOT NULL DEFAULT 'En Proceso',
    "totalNetoAPagar" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlameDeclaracion_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "TEmpresa" ("companyId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlameDetallePersona" (
    "detalleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plameDeclaracionId" INTEGER NOT NULL,
    "tPersonaId" INTEGER NOT NULL,
    "diasLaborados" INTEGER NOT NULL DEFAULT 30,
    "diasSubsidiados" INTEGER NOT NULL DEFAULT 0,
    "diasNoLaborados" INTEGER NOT NULL DEFAULT 0,
    "horasOrdinarias" TEXT NOT NULL DEFAULT '00:00',
    "horasSobretiempo" TEXT NOT NULL DEFAULT '00:00',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlameDetallePersona_plameDeclaracionId_fkey" FOREIGN KEY ("plameDeclaracionId") REFERENCES "PlameDeclaracion" ("plameDeclaracionId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlameDetallePersona_tPersonaId_fkey" FOREIGN KEY ("tPersonaId") REFERENCES "TPersona" ("tPersonaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlameDetalleIngreso" (
    "ingresoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detalleId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "devengado" REAL NOT NULL DEFAULT 0.0,
    "pagado" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "PlameDetalleIngreso_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "PlameDetallePersona" ("detalleId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlameDetalleDescuento" (
    "descuentoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detalleId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monto" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "PlameDetalleDescuento_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "PlameDetallePersona" ("detalleId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlameDetalleTributo" (
    "tributoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detalleId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "base" REAL NOT NULL DEFAULT 0.0,
    "monto" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "PlameDetalleTributo_detalleId_fkey" FOREIGN KEY ("detalleId") REFERENCES "PlameDetallePersona" ("detalleId") ON DELETE CASCADE ON UPDATE CASCADE
);
