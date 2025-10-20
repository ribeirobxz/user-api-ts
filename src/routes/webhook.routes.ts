import { Router } from "express";
import { processPaymentWebhookk } from "../controller/webhook.controller";

const router = Router();

router.post("/abacatepay", (req, res) => processPaymentWebhookk(req, res));

export default router;