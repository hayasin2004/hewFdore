import { Configure, QRCodeCreate } from '@paypayopa/paypayopa-sdk-node';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
Configure({
    clientId: process.env.PAYPAY_API_KEY || '',
    clientSecret: process.env.PAYPAY_SECRET || '',
    merchantId: process.env.PAYPAY_MERCHANT_ID || '',
    productionMode: false,
})

const PayPaySuccessResponse = z.object({
    STATUS: z.literal(201),
    BODY: z.object({
        data: z.object({
            url: z.string(),
        }),
    }),
})

export async function POST(req :Request ) {
    const merchantPaymentId = uuidv4();
    console.log(req)
    const payload = {
        merchantPaymentId,
        amount: {
            amount: 300,
            currency: "JPY",
        },
        codeType: 'ORDER_QR',
        orderDescription: 'Test Order',
        isAuthorization: false,
        redirectUrl: `http://localhost:3000/payment/paypay/${merchantPaymentId}`,
        redirectType: 'WEB_LINK',
    }

    const res = await QRCodeCreate(payload)

    if (res.STATUS === 201) {
        const url = PayPaySuccessResponse.parse(res).BODY.data.url

        return NextResponse.json({
            url,
        })
    } else {
        return NextResponse.error()
    }
}
