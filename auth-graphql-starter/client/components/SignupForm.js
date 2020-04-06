import React, { Component } from "react";
import AuthForm from "./AuthForm";
import { hashHistory } from "react-router";

import { graphql } from "react-apollo";
import mutation from "../mutations/Signup";
import query from "../queries/currentUser";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    // console.log(this.props, nextProps);
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push("/dashboard");
    }
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch((res) => {
        // debugger;
        const errors = res.graphQLErrors.map((err) => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <h3>Signup Form</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(mutation)(graphql(query)(SignupForm));
