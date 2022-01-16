import { gql } from "apollo-boost";
import React from "react";
import { Query } from "react-apollo";
import { Navigate } from "react-router-dom";
import { userFragment } from "../../graphql/fragments/userFragment";
import { MeQuery } from "../../schemaTypes";
import ChangeCreditCard from "./ChangeCreditCard";
import SubscribeUser from "./SubscribeUser";


const meQuery = gql`
query MeQuery{
me {
   ...UserInfo
    }
}
${userFragment}
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

                    return (
                        <div>
                            <div>Your current last 4 digits: {data.me.ccLast4}</div>
                            <ChangeCreditCard />
                        </div>
                    );
                }}
            </Query>
        );
    }
}