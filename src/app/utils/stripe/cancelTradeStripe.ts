"use server"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const cancelTradeStripe = async (stripeCode: string | null) => {
    try {
        if (stripeCode !== null) {
            const cancelStripe = await stripe.paymentIntents.cancel("pi_3QkBB3FGZsY8WLqm14Z3xAKy");
            console.log("Stripeにキャンセル申請しました。"+cancelStripe.id);
        }
    } catch (err) {
        console.log(err)
        return null
    }
}
export default cancelTradeStripe;