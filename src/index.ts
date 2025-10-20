import express, { application } from "express";
import userRoutes from "./routes/user.routes";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";    
import webhookRoutes from "./routes/webhook.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
app.use("/payments", paymentRoutes)
app.use("/webhook", webhookRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
