-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "TEmpresa" (
    "companyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Ocupacion" (
    "ocupacionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Entidades" (
    "entidadId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SituacionesEducativas" (
    "situacionEducativaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "requiereEstudios" BOOLEAN NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Persona" (
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

-- CreateTable
CREATE TABLE "Pais" (
    "idPais" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pais" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Departamento" (
    "idDepartamento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "departamento" TEXT NOT NULL,
    "idPais" INTEGER NOT NULL,
    CONSTRAINT "Departamento_idPais_fkey" FOREIGN KEY ("idPais") REFERENCES "Pais" ("idPais") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Provincia" (
    "idProvincia" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "provincia" TEXT NOT NULL,
    "idDepartamento" INTEGER NOT NULL,
    CONSTRAINT "Provincia_idDepartamento_fkey" FOREIGN KEY ("idDepartamento") REFERENCES "Departamento" ("idDepartamento") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distrito" (
    "idDistrito" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "distrito" TEXT NOT NULL,
    "idProvincia" INTEGER NOT NULL,
    CONSTRAINT "Distrito_idProvincia_fkey" FOREIGN KEY ("idProvincia") REFERENCES "Provincia" ("idProvincia") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Direccion" (
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

-- CreateTable
CREATE TABLE "TPersona" (
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

-- CreateTable
CREATE TABLE "Estudios" (
    "estudioId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tPersonaId" INTEGER NOT NULL,
    "formacionCompleta" TEXT NOT NULL,
    "estudioPeru" BOOLEAN NOT NULL,
    "privado" BOOLEAN NOT NULL,
    "tipoEducacion" TEXT NOT NULL,
    "nombreInstitucion" TEXT NOT NULL,
    "nombreCarrera" TEXT NOT NULL,
    "añoEgreso" INTEGER NOT NULL,
    CONSTRAINT "Estudios_tPersonaId_fkey" FOREIGN KEY ("tPersonaId") REFERENCES "TPersona" ("tPersonaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
