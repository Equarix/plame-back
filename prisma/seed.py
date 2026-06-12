from __future__ import annotations

import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from turso.lib_sync import connect_sync


DATABASE_URL = os.getenv("LOCAL_DATABASE_URL", "file:./dev.db")
ROOT = Path(__file__).resolve().parent.parent
ADMIN_PASSWORD_HASH = "$2b$10$tI7wAoUkLFaGjsFNC6CeyeOMdOm0WahjlRqk3BMPN5u4SgRAdirdO"


def load_env_file() -> None:
    env_path = ROOT / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def resolve_sqlite_path(database_url: str) -> Path:
    if not database_url.startswith("file:"):
        raise ValueError("LOCAL_DATABASE_URL must use the sqlite file: scheme")

    raw_path = database_url.removeprefix("file:")
    if raw_path.startswith("./"):
        raw_path = raw_path[2:]

    database_path = Path(raw_path)
    if not database_path.is_absolute():
        database_path = (ROOT / database_path).resolve()

    return database_path


def execute_sqlite_seed(cursor: sqlite3.Cursor) -> None:
    now = iso_now()

    cursor.executescript(
        """
        DELETE FROM "Estudios";
        DELETE FROM "TPersona";
        DELETE FROM "Persona";
        DELETE FROM "TEmpresa";
        DELETE FROM "Ocupacion";
        DELETE FROM "Entidades";
        DELETE FROM "SituacionesEducativas";
        DELETE FROM "User";
        """
    )

    cursor.execute(
        """
        INSERT INTO "User" ("name", "lastName", "username", "password", "role", "status")
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        ("Admin", "Sistema", "admin", ADMIN_PASSWORD_HASH, "ADMIN", 1),
    )

    cursor.executemany(
        """
        INSERT INTO "TEmpresa" ("name", "ruc", "address", "status")
        VALUES (?, ?, ?, ?)
        """,
        [
            ("Plame Principal SAC", "20123456789", "Av. Industrial 123, Lima", 1),
            ("Servicios Integrales SRL", "20567890123", "Jr. Comercio 456, Arequipa", 1),
        ],
    )

    cursor.executemany(
        """
        INSERT INTO "Ocupacion" ("name", "status", "createdAt")
        VALUES (?, ?, ?)
        """,
        [
            ("Analista de planillas", 1, now),
            ("Auxiliar administrativo", 1, now),
            ("Supervisor de operaciones", 1, now),
        ],
    )

    cursor.executemany(
        """
        INSERT INTO "Entidades" ("name", "status", "createdAt")
        VALUES (?, ?, ?)
        """,
        [
            ("EsSalud", 1, now),
            ("AFP Integra", 1, now),
            ("ONP", 1, now),
        ],
    )

    cursor.executemany(
        """
        INSERT INTO "SituacionesEducativas" ("nombre", "requiereEstudios", "estado", "createdAt")
        VALUES (?, ?, ?, ?)
        """,
        [
            ("Sin estudios", 0, 1, now),
            ("Educación superior completa", 1, 1, now),
            ("Educación universitaria completa", 1, 1, now),
        ],
    )

    cursor.executemany(
        """
        INSERT INTO "Persona" (
            "dni",
            "fechaNacimiento",
            "sexo",
            "estadoCivil",
            "nacionalidad",
            "primeraDireccion",
            "segundaDireccion",
            "telefono",
            "email",
            "estado",
            "createdAt"
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (
                "12345678",
                "1990-05-10T00:00:00Z",
                "M",
                "SOLTERO",
                "PERUANA",
                "Av. Central 123",
                "Dpto. 401",
                "999111222",
                "juan.perez@example.com",
                1,
                now,
            ),
            (
                "87654321",
                "1988-11-22T00:00:00Z",
                "F",
                "CASADA",
                "PERUANA",
                "Jr. Los Olivos 456",
                "Int. 2",
                "988777666",
                "maria.ramirez@example.com",
                1,
                now,
            ),
        ],
    )

    cursor.execute(
        """
        INSERT INTO "TPersona" (
            "personaId",
            "categoria",
            "periodoInicio",
            "periodoFin",
            "motivoBaja",
            "tipoTrabajador",
            "fechaInicio",
            "motivoBajaTrabajador",
            "regimenLaboral",
            "otroRegimenLaboral",
            "ocupacionId",
            "tipoContrato",
            "otroTipoContrato",
            "tipoPago",
            "otroTipoPago",
            "periodoIngreso",
            "otroPeriodoIngreso",
            "entidadId",
            "cuentaBancaria",
            "montoRemuneracionInicial",
            "regimenSalud",
            "fechaInicioSalud",
            "fechaFinSalud",
            "regimenPensionario",
            "fechaInicioPensionario",
            "fechaFinPensionario",
            "CUSPP",
            "sctr",
            "situacionEducativaId",
            "quintaCategoriaExonerada",
            "evitaDobleImposicion",
            "tEmpresaCompanyId"
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            1,
            "TRABAJADOR",
            "2026-01-01T00:00:00Z",
            None,
            None,
            "EMPLEADO",
            "2026-01-01T00:00:00Z",
            None,
            "D_LEG_728",
            None,
            1,
            "PLAZO_INDETERMINADO",
            None,
            "DEPOSITO_BANCARIO",
            None,
            "MENSUAL",
            None,
            1,
            "00123456789012345678",
            2500.0,
            "ESSALUD_REGULAR",
            "2026-01-01T00:00:00Z",
            None,
            "SPP_INTEGRA",
            "2026-01-01T00:00:00Z",
            None,
            "CUSPP001",
            0,
            2,
            0,
            0,
            1,
        ),
    )

    cursor.execute(
        """
        INSERT INTO "TPersona" (
            "personaId",
            "categoria",
            "periodoInicio",
            "periodoFin",
            "motivoBaja",
            "tipoTrabajador",
            "fechaInicio",
            "motivoBajaTrabajador",
            "regimenLaboral",
            "otroRegimenLaboral",
            "ocupacionId",
            "tipoContrato",
            "otroTipoContrato",
            "tipoPago",
            "otroTipoPago",
            "periodoIngreso",
            "otroPeriodoIngreso",
            "entidadId",
            "cuentaBancaria",
            "montoRemuneracionInicial",
            "regimenSalud",
            "fechaInicioSalud",
            "fechaFinSalud",
            "regimenPensionario",
            "fechaInicioPensionario",
            "fechaFinPensionario",
            "CUSPP",
            "sctr",
            "situacionEducativaId",
            "quintaCategoriaExonerada",
            "evitaDobleImposicion",
            "tEmpresaCompanyId"
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            2,
            "PENSIONISTA",
            "2026-02-01T00:00:00Z",
            None,
            None,
            "OBRERO",
            "2026-02-01T00:00:00Z",
            None,
            "OTROS",
            "REGIMEN_ESPECIAL",
            2,
            "TIEMPO_PARCIAL",
            None,
            "EFECTIVO",
            None,
            "MENSUAL",
            None,
            2,
            None,
            1800.0,
            "SIS_MICROEMPRESA",
            "2026-02-01T00:00:00Z",
            None,
            "SIN_REGIMEN_PENSIONARIO",
            "2026-02-01T00:00:00Z",
            None,
            None,
            0,
            1,
            1,
            0,
            2,
        ),
    )

    cursor.executemany(
        """
        INSERT INTO "Estudios" (
            "tPersonaId",
            "formacionCompleta",
            "estudioPeru",
            "privado",
            "tipoEducacion",
            "nombreInstitucion",
            "nombreCarrera",
            "añoEgreso"
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (1, "SUPERIOR_COMPLETA", 1, 1, "UNIVERSIDAD", "Universidad Nacional", "Contabilidad", 2012),
            (2, "UNIVERSITARIA_COMPLETA", 1, 0, "UNIVERSIDAD", "Universidad Privada", "Administración", 2010),
        ],
    )


def execute_turso_seed() -> None:
    database_url = os.getenv("TURSO_DATABASE_URL")
    auth_token = os.getenv("TURSO_AUTH_TOKEN")

    if not database_url or not auth_token:
        raise RuntimeError("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required for Turso seeding")

    temp_path = ROOT / ".temp" / "seed-turso.db"
    temp_path.parent.mkdir(parents=True, exist_ok=True)

    connection = connect_sync(str(temp_path), remote_url=database_url, auth_token=auth_token)
    cursor = connection.cursor()
    execute_sqlite_seed(cursor)
    connection.commit()
    connection.push()
    connection.close()


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main() -> None:
    load_env_file()

    turso_database_url = os.getenv("TURSO_DATABASE_URL")
    turso_auth_token = os.getenv("TURSO_AUTH_TOKEN")

    if turso_database_url and turso_auth_token:
        execute_turso_seed()
        return

    database_path = resolve_sqlite_path(DATABASE_URL)
    database_path.parent.mkdir(parents=True, exist_ok=True)

    connection = sqlite3.connect(database_path)
    connection.execute("PRAGMA foreign_keys = ON")
    cursor = connection.cursor()
    execute_sqlite_seed(cursor)
    connection.commit()
    connection.close()


if __name__ == "__main__":
    main()