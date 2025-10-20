
import { boolean, date, decimal, integer, pgEnum, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
});

export const orderStatusEnum = pgEnum("order_status", ["PENDING", "PAID"]);
export const ordersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    billingId: text("billingId"),       
    status: orderStatusEnum("status").notNull(),
    price: integer("price").notNull(),
    date: timestamp("date").notNull(),
});