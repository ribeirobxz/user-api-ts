import { z} from 'zod';
import { OrderStatus } from '../type/order.type';
export const orderSchema = z.object({
    billingId: z.string().optional(),
    status: z.enum(OrderStatus),
    price: z.number().nonnegative()
});