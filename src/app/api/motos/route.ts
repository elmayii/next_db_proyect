import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";
import prisma from "@/lib/prisma";
import { CreateMoto, Moto, Motos } from "@/interfaces/Moto";

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
  try {
    const motos : any[] = await prisma.$queryRaw`SELECT * FROM obtener_resumen_motos()`;
    const marcas : any[] = await prisma.$queryRaw`SELECT * FROM obtener_resumen_motos()`;
    const modelos : any[] = await prisma.$queryRaw`SELECT * FROM obtener_resumen_motos()`;
    const result: Moto[] = motos.map((moto) => ({
      id_moto: moto.id_moto,
      color: moto.color ,
      km: moto.km,
      marca: marcas.find((ma) => ma.id_marca === moto.id_marca),
      modelo: modelos.find((mo) => mo.id_modelo === moto.id_modelo),
      matricula: moto.matricula
    }));

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
  
  const data: CreateMoto = await request.json();
  const {color,km,matricula,id_marca,id_modelo,id_situa} = data
  try {
    await prisma.$queryRaw`SELECT * FROM crear_moto(${color},${km},${id_marca},${id_modelo},${id_situa},${matricula})`
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error)
    if(error.code === "P2002"){
      return NextResponse.json("Numero de flota o chapa ya usado", { status: 400 });
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