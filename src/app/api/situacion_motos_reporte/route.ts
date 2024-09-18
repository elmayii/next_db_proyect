import { Municipio } from "@/interfaces/Municipio";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result : Municipio[] = await prisma.$queryRaw`SELECT * FROM obtener_situacion_motos()`;
  return NextResponse.json(result ?? []);
  } catch (error) {
    console.log(error)
  }
};