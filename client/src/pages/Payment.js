import React from 'react';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import StripeCheckout from '../components/Stripe/StripeCheckout';
import '../stripe.css';

// load stripe outside of components render to avoid recreating stripe object every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div className="container-fluid p-5 text-center">
            <h4>Complete your purchase</h4>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    )
}

export default Payment;