import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricList extends Component {
  onLike = (id, likes) => {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          __typename: "LyricType",
          id,
          likes: likes + 1,
        },
      },
    });
  };

  renderLyrics = () => {
    return this.props.lyrics.map((lyric) => {
      return (
        <li key={lyric.id} className="collection-item">
          {lyric.content}
          <div>
            <i
              className="material-icons"
              onClick={(lyric) => this.onLike(lyric.id, lyric.likes)}
            >
              thumb_up
            </i>
            {lyric.likes}
          </div>
        </li>
      );
    });
  };
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
