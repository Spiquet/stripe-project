import * as React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class SubscribeUser extends React.Component {
    render() {
        return (

            // ...
            <StripeCheckout
                token={(token) => {
                    console.log(token);
                }}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
            />
        )
    }
}