import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricCreate extends Component {
  state = {
    content: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.params.id,
        },
      })
      .then(() => this.setState({ content: "" }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="content">add a lyric</label>
          <input
            type="text"
            name="content"
            id="content"
            value={this.state.content}
            onChange={(e) => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    );
  }
}
// giving id make caching mechanism works well

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
