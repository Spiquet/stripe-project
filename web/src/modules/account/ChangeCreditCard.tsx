import { gql } from 'apollo-boost';
import * as React from 'react'
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import { userFragment } from '../../graphql/fragments/userFragment';
import { ChangeCreditCardMutation, ChangeCreditCardMutationVariables } from '../../schemaTypes';

const changeCreditCardMutation = gql`
    mutation ChangeCreditCardMutation($source: String!, $ccLast4: String!) {
        changeCreditCard(source: $source, ccLast4: $ccLast4) {
            ...UserInfo
        }
    }
    ${userFragment}
`
export default class ChangeCreditCard extends React.Component {
    render() {
        return (
            <Mutation<ChangeCreditCardMutation, ChangeCreditCardMutationVariables>
                mutation={changeCreditCardMutation}
            >
                {mutate => (
                    <StripeCheckout
                        token={async token => {
                            const response = await mutate({
                                variables: { source: token.id, ccLast4: token.card.last4 }
                            });
                            console.log(response);

                        }}
                        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE!}
                        name='changeCreditCard'
                    />
                )}
            </Mutation>
        );
    }
}