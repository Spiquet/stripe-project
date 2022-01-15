import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { LoginMutation, LoginMutationVariables } from "../../schemaTypes";
import { meQuery } from "../../graphql/queries/me";





const loginMutation = gql`
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        id
        email
        type
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
            <Mutation<LoginMutation, LoginMutationVariables>
            update={(cache, { data }) => {
                if (!data || !data.login) {
                  return;
                }
      
                cache.writeQuery({
                  query: meQuery,
                  data: { me: data.login }
                });
              }}
                mutation={loginMutation}
            >
                {(mutate, {client}) => (

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
                                    //optionnal reset cache before user logs
                                    await client?.resetStore();
                                    const response = await mutate({
                                        variables: this.state
                                    });
                                    console.log('response', response);
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }

}