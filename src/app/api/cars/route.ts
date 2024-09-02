import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";
import prisma from "@/lib/prisma";
import { Moto } from "@/interfaces/Moto";

export const COLUMN_NAME = "motos" as never;

/**
 * @swagger
 * /api/cars:
 *  get:
 *    tags:
 *      - Cars
 *    summary: Returns the cars
 *    description: Returns the cars
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const motos = await prisma.moto.findMany();
  const marcas = await prisma.marca.findMany();
  const modelos = await prisma.modelo.findMany();
  const situaciones = await prisma.situacion.findMany();
  const result: Moto[] = motos.map((moto) => ({
    id_moto: moto.id_moto,
    color: moto.color ,
    km: moto.km,
    marca: marcas.find((ma) => ma.id_marca === moto.id_marca),
    modelo: modelos.find((mo) => mo.id_modelo === moto.id_modelo),
    situacion: situaciones.find((s) => s.id_situa === moto.id_situa),
    matricula: moto.matricula
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/cars:
 *    post:
 *      tags:
 *        - Cars
 *      summary: Insert a car
 *      description: Insert a car
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
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.moto.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error.code)
    if(error.code === "P2002"){
      return NextResponse.json("Numero de flota o chapa ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando marca", { status: 400 }); 
  }
};
