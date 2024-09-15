import prisma from "../../../libs/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers"
import { NextResponse } from "next/server";

import type { AddressType } from "../../../types"

export async function GET(): Promise<NextResponse> {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw Error()

    const res: AddressType | null = await prisma.addresses.findFirst({
      where: { user_id: user.id }
    })

    await prisma.$disconnect();
    return NextResponse.json(res)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}