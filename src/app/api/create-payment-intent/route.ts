
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = () => {
    return 1400;
};

export default async function handler(req: { body: { items: any; }; }, res: {
        send: (arg0: {
            clientSecret: any;
             dpmCheckerLink: string;
        }) => void;
    }) {
    const { items } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
          dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });

};