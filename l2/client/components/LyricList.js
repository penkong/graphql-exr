import React, { Component } from "react";

class LyricList extends Component {
  onLike = (id) => {
    console.log(object);
  };

  renderLyrics = () => {
    return this.props.lyrics.map((lyric) => {
      return (
        <li key={lyric.id} className="collection-item">
          {lyric.content}
          <i
            className="material-icons"
            onClick={(lyric) => this.onLike(lyric.id)}
          >
            thumb_up
          </i>
        </li>
      );
    });
  };
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default LyricList;
