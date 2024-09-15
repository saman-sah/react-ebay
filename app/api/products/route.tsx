import prisma from "../../libs/Prisma";

import { NextResponse } from "next/server";

import { Product } from "../../types";

export async function GET(): Promise<NextResponse> {
  try {
    const products: Product[] = await prisma.products.findMany()

    await prisma.$disconnect();
    return NextResponse.json(products)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}