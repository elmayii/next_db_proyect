import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const fuels = await prisma.fuel.findMany();
  return NextResponse.json(fuels);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.fuel.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de combustible ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando combustible", { status: 400 });
  }
};
