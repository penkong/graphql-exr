import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
// interacter with backend graph ql server
// making request and store data locally when it comes back
// front end its only get data and store it locally
import ApolloClient from 'apollo-client';
// provide integration layer
import { ApolloProvider } from 'react-apollo';
import { Router , Route , hashHistory , IndexRoute } from 'react-router';
// apollo provider (react) <=> apollo store <=> graph server
import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
// new instance of apollo
// like redux
// relay needs a lot setup here
const client = new ApolloClient({
  dataIdFromObject : o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="songs/new" component={SongCreate}/>
          <Route path="songs/:id" component={SongDetail}/>
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
