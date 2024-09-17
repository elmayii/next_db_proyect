import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { CreateMarca, Marca } from "@/interfaces/Marca";

/**
 * @swagger
 *  /api/cars/{id}:
 *    get:
 *      tags:
 *        - Cars
 *      summary: Get car by id.
 *      description: Get car from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the car to obtain.
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
  const id_moto = parseInt(id);
  const moto = await prisma.moto.findFirst({ where: { id_moto } });
  if (moto) {
    return NextResponse.json(moto);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/cars/{id}:
 *    post:
 *      tags:
 *        - Cars
 *      summary: Update a car.
 *      description: Update a car.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the car to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              fleet_number: integer
 *              plate: string
 *              couple_code: integer
 *              brand_code: integer
 *            example:
 *              fleet_number: 10
 *              plate: PAA524
 *              couple_code: 1
 *              brand_code: 1
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
  const data :Marca= await request.json();
  const p_nom_marca = data.nom_marca
  const { id } = params;
  const p_id_marca = parseInt(id);
  await prisma.$executeRaw`SELECT actualizar_marca(${p_id_marca}, ${p_nom_marca })`;
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/cars/{id}:
 *    delete:
 *      tags:
 *        - Cars
 *      summary: Delete car by id.
 *      description: Delete car from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the car to delete.
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
  try {
    const { id } = params;
    const p_id_marca= parseInt(id);
    await prisma.$executeRaw`SELECT eliminar_marca(${p_id_marca})`;
    return NextResponse.json({ ok: true });
  } catch (error: any) {
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
