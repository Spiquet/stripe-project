import React, { PureComponent } from 'react';
import { gql } from 'apollo-boost';
import { userFragment } from '../../graphql/fragments/userFragment';
import { Mutation } from 'react-apollo';
import { CancelSubscriptionMutation } from '../../schemaTypes';

const cancelSubscriptionMutation = gql`
mutation CancelSubscriptionMutation {
    cancelSubscription {
        ...UserInfo
    }
}
${userFragment}
`

export class CancelSubscription extends PureComponent {
    render() {
        return (<Mutation<CancelSubscriptionMutation>
            mutation={cancelSubscriptionMutation}
        >
            {mutate => (
                <button onClick={() => mutate()}>Cancel subscription</button>
            )}
        </Mutation>
        );
    }
}

export default CancelSubscription;