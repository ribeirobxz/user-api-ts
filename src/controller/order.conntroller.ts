import { Request, Response } from "express";
import { orderSchema } from "../schema/order.schema";
import { db } from "../service/database.service";
import { ordersTable } from "../schema/db.schema";
import { eq } from "drizzle-orm";

export async function createOrder(request: Request, response: Response) {
    const validOrder = orderSchema.safeParse(request.body);    
    if(!validOrder.success){
        return response.status(400).json({
            message: "Erro de validação",
            errors: validOrder.error.issues
        });
    }

    const orderData = validOrder.data;
    const [orderInserted] = await db.insert(ordersTable).values({
        billingId: null,
        status: orderData.status,
        price: orderData.price,
        date: new Date()
    }).returning();

    return response.status(201).json(orderInserted);
}

export async function getOrderById(request: Request, response: Response) {
    const orderId = parseInt(request.params.id);
    if (isNaN(orderId)) {
        return response.status(400).json({ error: "ID inválido" });
    }

    const orders = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId)).limit(1);
    if(orders.length === 0) {
        return response.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const order = orders[0];
    return response.status(200).json(order);
}

export async function getAllOrders(request: Request, response: Response) {
    const orders = await db.select().from(ordersTable);
    return response.status(200).json(orders);
}

export async function deleteOrder(request: Request, response: Response) {   
    const orderId = parseInt(request.params.id);
    if (isNaN(orderId)) {
        return response.status(400).json({ error: "ID inválido" });
    }

    const orders = await db.select().from(ordersTable).where(eq(ordersTable.id, orderId)).limit(1);
    if(orders.length === 0) {
        return response.status(404).json({ error: 'Pedido não encontrado.' });
    }

    await db.delete(ordersTable).where(eq(ordersTable.id, orderId));
    return response.status(200).json({ message: 'Pedido deletado com sucesso.' });
}