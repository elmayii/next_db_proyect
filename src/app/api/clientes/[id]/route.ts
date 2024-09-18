import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

/**
 * @swagger
 *  /api/contracts/{id}:
 *    get:
 *      tags:
 *        - Contracts
 *      summary: Get a contract by id.
 *      description: Get a contract from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the contract to obtain.
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
  try {
    const municipio = parseInt(params.id)
    const result = await prisma.$queryRaw`SELECT * FROM obtener_resumen_clientes(${municipio})`;
    console.log(result)
  return NextResponse.json(result ?? []);
  } catch (error) {
    console.log(error)
  }
};

/**
 * @swagger
 *  /api/contracts/{id}:
 *    post:
 *      tags:
 *        - Contracts
 *      summary: Update a contracts.
 *      description: Update a contracts.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the contract to update.
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
 *        '400':
 *          description: Not found
 */
