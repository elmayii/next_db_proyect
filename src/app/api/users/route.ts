import { CreateUser, User } from "@/interfaces/User";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Returns the users
 *    description: Returns the users
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const users:any[] = await prisma.$queryRaw`SELECT * FROM obtener_usuarios()`;
  const roles :any[] = await prisma.$queryRaw`SELECT * FROM obtener_roles()`;
  const municipios:any[] = await prisma.$queryRaw`SELECT * FROM obtener_todos_los_municipios()`;
  const result: User[] = users .map((user) => ({
    id_usuario: user.id_usuario,
    nom_usuario: user.nom_usuario,
    edad: user.edad,
    sexo: user.sexo,
    num_tel: user.num_tel,
    id_mun: user.id_mun,
    nom_mun: (municipios ).find((m) => m.id_mun === user.id_mun)?.nom_mun,
    id_rol: user.id_rol,
    rol: (roles).find((r) => r.role_code === user.id_rol)?.role_name,
    password: user.password,
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/users:
 *    post:
 *      tags:
 *        - Users
 *      summary: Insert a user
 *      description: Insert a user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              username: string
 *              password: string
 *              name: string
 *              email: string
 *              role: integer
 *            example:
 *              username: jorge
 *              password: 12345
 *              name: Jorge
 *              email: jorge@gmail.com
 *              role: 1
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data:CreateUser = await request.json();
  const {
    nom_usuario,
    edad,
    sexo,
    num_tel,
    id_mun,
    id_rol,
    password,
  } = data;
  try {
    
    await prisma.$queryRaw`SELECT crear_usuario(${nom_usuario},${edad},${sexo},${num_tel},${id_mun},${id_rol},${password})`;
    const mensajeBienvenida = `Usuario creado satisfactoriamente. Bienvenid@, ${data.nom_usuario}!.
Nombre de usuario: ${data.nom_usuario}.
Contraseña: ${data.password}.
E-Moto: http://localhost:3000`;
    // enviarCorreoElectronico(data.email,'Usuario creado', mensajeBienvenida)
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de usuario ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando usuario", { status: 400 });
  }
};
