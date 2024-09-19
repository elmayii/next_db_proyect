import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CreateMarca } from "@/interfaces/Marca";

export const COLUMN_NAME = "marcas" as never;

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
  try {
    const result : any[] = await prisma.$queryRaw`SELECT * FROM obtener_todas_las_marcas()`;
  return NextResponse.json(result ?? []);
  } catch (error) {
    console.log(error)
  }
};

//const data = await prisma.$queryRaw`SELECT * FROM obtener_resumen_motos()`;

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
  
  const data: CreateMarca = await request.json();
  const {nom_marca} = data
  try {
    await prisma.$executeRaw`SELECT crear_marca(${nom_marca})`
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error)
    if(error.code === "P2002"){
      return NextResponse.json("Nombre de marca ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando marca", { status: 400 }); 
  }
};


// BEGIN
// 	RETURN QUERY SELECT m.matricula, m.color, m.km, ma.nom_marca, mod.nom_modelo, ma.id_marca, mod.id_modelo
// 	FROM public."Moto" as m JOIN public."Modelo" as mod on m.id_modelo = mod.id_modelo
// 	JOIN public."Marca" as ma ON mod.id_marca = ma.id_marca;
// END;

// TABLE(matricula character varying, color character varying, km double precision, nom_marca character varying, nom_modelo character varying)