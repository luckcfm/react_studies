import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      newTodo: 'Wash the dishes',
      editing: false,
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
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }
  addTodo () {
    const newTodo = {
      name: this.state.newTodo,
      id: this.state.todos[this.state.todos.length -1].id + 1
    };
    const oldTodos = this.state.todos;

    oldTodos.push(newTodo);

    this.setState({
      todos: oldTodos,
      newTodo: ''
    });
  }
  updateTodo (index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name
    })
  }
  deleteTodo (index) {
    const todos = this.state.todos;

    delete todos[index];

    this.setState({todos});
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
        <button onClick={this.addTodo} className="btn-info mb-3 form-control">
          {this.state.editing ? 'UPDATE TODO' : 'ADD TODO'}
        </button>
      <ul className="list-group">
        {this.state.todos.map((item,index) => {
          return <li 
              key={item.id} 
              className="list-group-item">
               <button 
              onClick={() => {this.updateTodo(index)}} 
              className="btn-sm btn btn-info mr-4">
              U
            </button> 
              {item.name}
            <button 
              onClick={() => {this.deleteTodo(index)}} 
              className="btn-sm btn btn-danger ml-4">
              X
            </button> 
          </li>
        } )}
      </ul>
    </div>
      </div>
    );
  }
}

export default App;
