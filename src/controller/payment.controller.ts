import { Request, Response } from "express";
import { abacatePay } from "../service/abacatepay.service";
import { db } from "../service/database.service";
import { ordersTable } from "../schema/db.schema";
import { eq } from "drizzle-orm";
import { OrderStatus } from "../type/order.type";
import { CreateBillingResponse } from "abacatepay-nodejs-sdk/dist/types";
import paymentSchema from "../schema/payment.schema";

export async function createPayment(request: Request, response: Response) {
    const validPayment = paymentSchema.safeParse(request.body);
    if (!validPayment.success) {
        return response.status(400).json({
            message: "Validação incorreta",
            errors: validPayment.error.issues
        }
        );
    }

    const paymentData = validPayment.data;
    const orders = await db.select().from(ordersTable).where(eq(ordersTable.id, paymentData.orderId)).limit(1);
    if (orders.length === 0) {
        return response.status(404).json({ message: "Pedido não encontrado" });
    }

    const billing: CreateBillingResponse = await abacatePay.billing.create({
        frequency: "ONE_TIME",
        methods: ["PIX"],
        products: [
            {
                externalId: "PRO-PLAN",
                name: "Pro plan",
                quantity: 1,
                price: orders[0].price,
            },
        ],
        returnUrl: "https://yoursite.com/app",
        completionUrl: "https://yoursite.com/payment/success",
        customer: {
            name: "Customer Name",
            email: "customer@example.com",
            cellphone: "+5511999999999",
            taxId: "09240529020",
        },
    });

    await db.update(ordersTable).set({
        billingId: billing.data!!.id,
        status: OrderStatus.PENDING
    }).where(eq(ordersTable.id, paymentData.orderId));

    return response.status(201).json({
        message: "Pagamento processado com sucesso.",
        url: billing.data!!.url
    });
}