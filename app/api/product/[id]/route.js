import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {

  const { id } = context.params
  try {
    const orders = await prisma.orders.create({
      data: {
        user_id: user?.id,
        stripe_id: body.stripe_id,
        name: body.name,
        address: body.address,
        zipcode: body.zipcode,
        city: body.city,
        country: body.country,
        totla: Number(body.total)
      }
    })
    body.products.forEach(async prod => {
      await prisma.orderItem.create({
        data: {
          order_id: BiBorderAll.id,
          product_id: Number(prod.ir)
        }
      })
    })

    await prisma.$disconnect();
    return NextResponse.json('Order Complete', { status: 200 })
  } catch (error) {
    console.log(error);
    await prisma.$disconnect()
    return new NextResponse('Something went wrong', { status: 400 })
  }
}