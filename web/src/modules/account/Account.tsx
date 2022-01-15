import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import { Navigate } from "react-router-dom";
import { MeQuery } from "../../schemaTypes";
import SubscribeUser from "./SubscribeUser";


const meQuery = gql`
query MeQuery{
me {
    id
    email
    type
    }
}
`;

export class Account extends React.PureComponent {
    render() {
        return (
            <Query<MeQuery> query={meQuery}>
                {({ data, loading }) => {
                    if (loading) {
                        return null;
                    }

                    if (!data) {
                        return <div>data is undefined</div>;
                    }

                    if (!data.me) {
                        return <Navigate to="/login" />;

                    }

                    if (data.me.type === 'free-trial') {
                        return <SubscribeUser />
                    }

                    return <Navigate to="/paid-users" / >

                }}
            </Query>
        );
    }
}