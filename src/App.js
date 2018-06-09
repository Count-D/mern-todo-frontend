import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import CheckboxList from './Checkbox';
import Form from './Form';

const TodosQuery = gql`{
  todos {
    id
    text
    complete
  }
}`

const UpdateMutation = gql `
  mutation($id: ID!, $complete: Boolean!){
    updateTodo(id: $id, complete: $complete)
  }`

const DeleteMutation = gql `
mutation($id: ID!){
  deleteTodo(id: $id)
}`

const CreateTodoMutation = gql `
mutation($text: String!) {
  createTodo(text: $text ){
    id
    text
    complete
  }
}`

class App extends Component {

  updateTodo = async todo => {
    await this.props.updateTodo({
        variables: {
            id: todo.id,
            complete: !todo.complete
        },
        update: store => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: TodosQuery });
          // Add our comment from the mutation to the end.
          data.todos = data.todos.map(x => x.id === todo.id ? ({
            ...todo,
            complete: !todo.complete
          }) : x)
          // Write our data back to the cache.
          store.writeQuery({ query: TodosQuery, data });
        }
    })
  };

  deleteTodo = async todo => {
    await this.props.deleteTodo({
      variables: {
        id: todo.id
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.filter(x => x.id !== todo.id)
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    })
  }; 

  createTodo = async text => {
    await this.props.createTodo({
      variables: {
        text
      },
      update: (store, {data: {createTodo}}) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos.unshift(createTodo)
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }
    })
  };
  
  render() {
    const {data: {loading, todos}} = this.props;
    if(loading){
      return null;
    }
    
    return (
      <div className="App" style={{display: 'flex'}}>
        <div style={{margin: 'auto', width: 400}}>
          <Paper elevation={1}>
            <Form submit = {this.createTodo} />
          <CheckboxList updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} removeTodo={this.removeTodo} todos={todos} />
        </Paper>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(UpdateMutation, {name: 'updateTodo'}), 
  graphql(DeleteMutation, {name: 'deleteTodo'}),
  graphql(CreateTodoMutation, {name: 'createTodo'}), 
  graphql(TodosQuery)
  )(App);
