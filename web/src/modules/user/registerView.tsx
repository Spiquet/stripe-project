import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { RegisterMutationMutation, RegisterMutationMutationVariables } from "../../generated/graphql";



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
            <Mutation<RegisterMutationMutation, RegisterMutationMutationVariables> mutation={registerMutation}>
                {() => (

                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                            <button onClick={() => console.log("hi")}>Register</button>
                        </div>
                    </form>
                )}
            </Mutation>
        );
    }

}