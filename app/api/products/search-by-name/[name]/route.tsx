import prisma from "../../../../libs/Prisma";

import { NextResponse } from "next/server";

import type { Product } from "../../../../types";

interface ContextParams {
  params: {
    name: string
  }
}

export async function GET(req: Request, context: ContextParams) {
  try {
    console.log('context.params', context.params)
    const { name } = context.params

    const items: Product[] = await prisma.products.findMany({
      take: 5,
      where: {
        title: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })

    await prisma.$disconnect();
    return NextResponse.json(items)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}