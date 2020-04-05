import React, { Component } from "react";
import { graphql } from "react-apollo";

import mutation from "../mutations/login";
import AuthForm from "./AuthForm";

class LoginForm extends Component {
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
    });
  }

  render() {
    return (
      <div>
        <h3>Login For App</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
