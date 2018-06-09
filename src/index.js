import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo';
const client = new ApolloClient({
  uri: "https://mern-todo-app-backend.herokuapp.com/"
});



ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
