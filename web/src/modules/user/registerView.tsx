import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutation, RegisterMutationVariables } from "../../schemaTypes";



const registerMutation = gql`
mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
  `;
export class RegisterView extends React.PureComponent {
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
            <Mutation<RegisterMutation, RegisterMutationVariables>
                mutation={registerMutation}
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