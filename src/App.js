import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
class App extends Component {
  constructor() {
    super();

    this.state = {
      newTodo: 'Wash the dishes',
      editing: false,
      editingIndex: null,
      todos: [{
        id: 1,name :'Play golf'
      },{
        id: 2,name :'Buy some clothes'
      },{
        id: 3,name :'Write some code'
      },{
        id: 4,name :'Watch badcast'
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.generateTodoId = this.generateTodoId.bind(this);
    this.alert = this.alert.bind(this);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  generateTodoId () {
    const lastTodo = this.state.todos[this.state.todos.length - 1];

    if(lastTodo)
      return lastTodo.id + 1;

    return 1;
  }
  addTodo () {
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };
    const oldTodos = this.state.todos;

    oldTodos.push(newTodo);

    this.setState({
      todos: oldTodos,
      newTodo: ''
    });
  }
  alert() {

  }
  editTodo (index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      editingIndex: index,
      newTodo: todo.name
    })
  }
  deleteTodo (index) {
    const todos = this.state.todos;
    delete todos[index];
    this.setState({todos});
  }
  updateTodo(index) {
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;

    this.setState({todos,editing: false, editingIndex: null, newTodo: ''});
  }
  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CRUD REACT</h1>
        </header>
        <div className="container">
      <input 
        type="text" 
        name="todo"
        className="m-4 form-control"
        placeholder= "Add a new todo"
        value={this.state.newTodo}
        onChange={this.handleChange}
        />
        <button onClick={this.state.editing ? this.updateTodo : this.addTodo} className="btn-info mb-3 form-control">
          {this.state.editing ? 'UPDATE TODO' : 'ADD TODO'}
        </button>
        {
          !this.state.editing && 
          <ul className="list-group">
          {this.state.todos.map((item,index) => {
            return <ListItem 
                key={item.id}
                item={item}
                editTodo={() => {this.editTodo(index);}}
                deleteTodo={() => {this.deleteTodo(index);}}
                />
          } )}
        </ul>
        }
    </div>
      </div>
    );
  }
}

export default App;
