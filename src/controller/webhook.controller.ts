import { Request, Response } from "express";
import { ordersTable } from "../schema/db.schema";
import { db } from "../service/database.service";
import { OrderStatus } from "../type/order.type";
import { eq } from "drizzle-orm";

export async function processPaymentWebhookk(request: Request, response: Response) {
    const { event, data } = request.body;
    if (event !== "billing.paid") {
        return;
    }

    const billingId = data.billing.id;
    const order = await db.select().from(ordersTable).where(eq(ordersTable.billingId, billingId)).limit(1);
    if (order.length === 0) {
        return response.status(404).json({ message: "Pedido não encontrado para o billingId fornecido." });
    }

    await db.update(ordersTable).set({ status: OrderStatus.PAID }).where(eq(ordersTable.id, order[0].id));
}