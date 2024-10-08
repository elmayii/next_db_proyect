import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { EditUser, User } from "@/interfaces/User";

/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get a user by id.
 *      description: Get a users from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to obtain.
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Not found
 */

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user_code = parseInt(id);
  const user = await prisma.$executeRaw`SELECT obtener_usuario(${user_code})`;
  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/users/{id}:
 *    post:
 *      tags:
 *        - Users
 *      summary: Update a user.
 *      description: Update a user.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              username: string
 *              password: string
 *              name: string
 *              role: integer
 *            example:
 *              username: jorge
 *              password: 12345
 *              name: Jorge
 *              role: 1
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Not found
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try{
    const data:EditUser = await request.json();
    const { id } = params;
    const user_code = parseInt(id);
    await prisma.$executeRaw`SELECT actualizar_usuario(${user_code}, ${data.nom_usuario}, ${data.edad}, ${data.sexo}, ${data.num_tel}, ${data.id_mun}, ${data.id_rol})`;
    return NextResponse.json({ ok: true });
  }catch(error: any){
    return NextResponse.json("Error modificando usuario", { status: 400 });
  }
  
};

/**
 * @swagger
 *  /api/users/{id}:
 *    delete:
 *      tags:
 *        - Users
 *      summary: Delete user by id.
 *      description: Delete user from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to delete.
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Not found
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try{
    const { id } = params;
    const id_usuario = parseInt(id);
    await prisma.$executeRaw`SELECT eliminar_usuario(${id_usuario})`;
    return NextResponse.json({ ok: true });
  }catch(error: any){
    if (
      (error as PrismaClientUnknownRequestError).name ===
      "PrismaClientUnknownRequestError"
    ) {
      const bdError = handlePrismaClientUnknownRequestError(error);
      return NextResponse.json(bdError, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
};
