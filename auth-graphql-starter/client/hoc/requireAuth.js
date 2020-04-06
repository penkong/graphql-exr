import React, { Component } from "react";
import query from "../queries/currentUser";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

export default (wrappedCompnent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user)
        hashHistory.push("/");
    }
    render() {
      return <wrappedCompnent {...this.props} />;
    }
  }

  export default graphql(query)(RequireAuth);
};
