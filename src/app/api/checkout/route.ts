import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil'
});

const getAbsoluteImageUrl = (path: string) =>
    `http://localhost:3000${path.replace("/public", "")}`;


export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { items } = await request.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "No items in cart" },
                { status: 400 }
            );
        }

        // Create line items for Stripe checkout
        const lineItems = items.map((item: any) => {
            if (!item.name || !item.price) {
                throw new Error("Invalid item format");
            }
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: item.image ? [getAbsoluteImageUrl(item.image)] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to paise and ensure it's an integer
                },
                quantity: item.quantity || 1,
            };
        });

        // Create Stripe checkout session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/',
            customer_email: session.user.email,
            metadata: {
                userId: session.user.id,
            },
        });

        return NextResponse.json({ sessionId: stripeSession.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        
        // Return more specific error messages
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        );
    }
}