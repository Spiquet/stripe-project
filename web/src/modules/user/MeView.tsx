import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import { MeQueryQuery } from "../../generated/graphql";


const meQuery = gql`
query MeQuery{
me {
    id
    email
}
}
`;

export class MeView extends React.PureComponent {
    render() {
        return (
            <Query<MeQueryQuery> query={meQuery}>
                {({ data, loading }) => {
                    if (loading) {
                        return null;
                    }

                    if (!data) {
                        return <div>data is undefined</div>;
                    }

                    if (!data.me) {
                        return <div>received no user</div>;
                    }

                    return <div>{data.me.email}</div>;
                }}
            </Query>
        );
    }
}