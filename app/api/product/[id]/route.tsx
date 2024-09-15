import prisma from "../../../libs/Prisma";

import { NextResponse } from "next/server";

import type { Product as ProductType } from "../../../types"

interface ContextParams {
  params: {
    id: string
  }
}

export async function GET(req: Request, context: ContextParams): Promise<NextResponse> {

  const { id } = context.params
  try {
    const { id } = context.params

    const product: ProductType | null = await prisma.products.findFirst({
      where: { id: Number(id) }
    })

    await prisma.$disconnect();
    return NextResponse.json(product)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}