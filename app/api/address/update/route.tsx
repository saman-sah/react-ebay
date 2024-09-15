import prisma from "../../../libs/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers"

import { AddressType } from "../../../types"

export async function POST(req: Request): Promise<NextResponse> {
  const supabase = createServerComponentClient({ cookies })

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw Error()

    const body: AddressType = await req.json()

    const res: AddressType = await prisma.addresses.update({
      where: { id: Number(body.id) },
      data: {
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country
      }
    })

    await prisma.$disconnect();
    return NextResponse.json(res)
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}