import { Contract, CreateContract } from "@/interfaces/Contract";
import prisma from "@/lib/prisma";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/contracts:
 *  get:
 *    tags:
 *      - Contracts
 *    summary: Returns the contracts
 *    description: Returns the contracts
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  try {
    const result : any[] = await prisma.$queryRaw`SELECT * FROM obtener_resumen_contratos()`;
  return NextResponse.json(result ?? []);
  } catch (error) {
    console.log(error)
  }
};

/**
 * @swagger
 *  /api/contracts:
 *    post:
 *      tags:
 *        - Contracts
 *      summary: Insert a contract
 *      description: Insert a contract
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              applicant_name: string
 *              start_date: date
 *              end_date: date
 *              contract_kms: double
 *              contract_amount: double
 *              contract_country: string
 *              car_code: integer
 *            example:
 *              applicant_name: Pepe
 *              start_date: 2024-02-02T00:00:00.000Z
 *              end_date: 2024-02-07T00:00:00.000Z
 *              contract_kms: 10
 *              contract_amount: 20
 *              contract_country: US
 *              car_code: 31
 *      responses:
 *        '200':
 *          description: OK
 */


export const POST = async (request: Request, response: Response) => {
  
  const data: CreateContract = await request.json();
  const { fecha_ini } = data
  try {
    await prisma.$executeRaw`SELECT crear_modelo(${nom_modelo})`
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error)
    if(error.code === "P2002"){
      return NextResponse.json("Nombre de marca ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando marca", { status: 400 }); 
  }
};
