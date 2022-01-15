import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";


import { LoginMutationMutation, LoginMutationMutationVariables } from "../../generated/graphql";



const loginMutation = gql`
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        id
        email
    }
  }
  `;
export class LoginView extends React.PureComponent {
    state = {
        email: "",
        password: ""
    };

    handleChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        const { password, email } = this.state

        return (
            <Mutation<LoginMutationMutation, LoginMutationMutationVariables>
                mutation={loginMutation}
            >
                {mutate => (

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div>
                            <input
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="paswword"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <button
                                onClick={async () => {
                                    const response = await mutate({
                                        variables: this.state
                                    });
                                    console.log('response', response);
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }

}