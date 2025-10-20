export type Order = {
    id: number;
    billingId: string;
    status: OrderStatus;
    price: number;
    date: Date;
}

export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID"
}