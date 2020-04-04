import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class SongCreate extends Component {
  state = {
    title: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.mutate({ variables: { title: this.state.title } });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit()}>
          <label htmlFor="song">song title:</label>
          <input
            type="text"
            name="song"
            id="song"
            onChange={(e) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
