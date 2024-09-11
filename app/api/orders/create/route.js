import prisma from "@/app/libs/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers"

export async function GET() {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw Error()

    const orders = await prisma.orders.findMany({
      where: { user_id: user.id },
      orderBy: { id: 'desc' },
      include: {
        orderItem: {
          include: {
            product: true
          }
        }
      }
    })

    await prisma.$disconnect();
    return NextResponse.json(orders)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}