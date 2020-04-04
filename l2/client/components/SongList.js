import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map((song) => (
      <li key={song.id} className="collection-item">
        {song.title}
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading ...</div>;
    }
    return;
    <div>
      <ul className="collection">{this.renderSongs()}</ul>
      <Link to="/songs/new"></Link>
    </div>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;
// provide data props
export default graphql(query)(SongList);
