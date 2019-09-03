import React, { Component } from 'react';
// helper allow us to write query inside files.
// only define query and mutation
import gql from 'graphql-tag';
// helper lib allows us binding info back from graphql to our comp.
// play network request. play as wrapper.
// data back of it come in props object.
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({ variables : { id }})
            .then(()=>this.props.data.refetch());

    }
    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key={song.id} className="collection-item">
                    <Link to={`songs/${song.id}`}>{song.title}</Link>
                    <i className="material-icons" onClick={()=> this.onSongDelete(song.id)}>
                        delete
                    </i> 
                </li>
            );
        });
    } 
    render() {
        //console.log(this.props);
        if(this.props.data.loading) { return <div>Loading</div>}
        return (
            <div>

                <ul className="collection">
                    {this.renderSongs()}
                </ul>


                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>

        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id:$id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
); 
