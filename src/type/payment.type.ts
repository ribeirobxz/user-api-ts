

export type Payment = {
    id: number;
    orderId: number;
}

export type CardPayment = Payment & {
    cardNumber: number;
    cardExpiry: string;
    cardCVV: number;
    cardHolderName: string;
}

export type PixPayment = Payment & {
    pixKey: string;
    qrCodeUrl: string;
}

