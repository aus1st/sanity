import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2022-11-15',
});

export async function POST(request: NextRequest) {
    const item = await request.json();

    console.log(item);
    // const transformedItem = {
    //     price_data: {
    //         currency: 'usd',
    //         product_data: {
    //             images: [item.image],
    //             name: item.product_id,
    //         },
    //         unit_amount: Number(item.amount * 100),
    //     },
    //     description: item.title,
    //     quantity: item.quantity,
    // };
    const transformedItem = {
        price_data: {
            currency: 'usd',
            //images: [item.image],
            product_data: {
                name: item.title,
                
            },
            unit_amount: Number(item.amount),
            //description: item.title,


        },
        quantity: item.quantity,

    };
    console.log(transformedItem)
    const redirectURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hackathon01-aus1st.vercel.app/'


    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        description: item.product_id,
                        images: [item.image],

                    },
                    unit_amount: Number(item.amount)

                },
                quantity: 1//item.quantity,

            }],
            mode: 'payment',
            success_url: redirectURL + '?status=success',
            cancel_url: redirectURL + '?status=cancel',
            metadata: {
                images: item.image
            }
        });

        return NextResponse.json({ id: session.id });

    } catch (error) {
        return NextResponse.json({ error: 'somthing went wrong: ' + error });
    }


}