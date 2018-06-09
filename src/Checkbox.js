import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



class CheckboxList extends React.Component {
  state = {
    checked: [0],
  };

  render() {
      const todos = this.props.todos;
    return (
      <div>
        <List>
          {todos.map(todo => (
            <ListItem
              key={todo.id}
              role={undefined}
              dense
              button
              onClick={() => this.props.updateTodo(todo)}
            >
              <Checkbox
                checked={todo.complete}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={todo.text} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => this.props.deleteTodo(todo)}>
                  <CloseIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


export default CheckboxList;