import { z } from "zod";

const paymentSchema = z.object({
    orderId: z.number().positive()
});

export default paymentSchema;