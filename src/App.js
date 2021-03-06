import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import loadingGif from './loading.gif';
class App extends Component {
  constructor() {
    super();

    this.state = {
      newTodo: 'Wash the dishes',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = 'https://5b95a17e52764b001413bb3a.mockapi.io/'
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.alert = this.alert.bind(this);
  }

  componentWillMount() {
    console.log('Component will mout!');
  }
  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);

    this.setState({
      todos: response.data,
      loading: false
    });


  }
  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  async addTodo () {
   
    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    console.log(response);
    const oldTodos = this.state.todos;

    oldTodos.push(response.data);

    this.setState({
      todos: oldTodos,
      newTodo: ''
    });

    this.alert('Todo added successfully');
  }
  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    } ,2000);
  }
  editTodo (index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      editingIndex: index,
      newTodo: todo.name
    })
  }
  async deleteTodo (index) {
    
    const todos = this.state.todos;
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];
    this.setState({todos});
    this.alert('Todo deleted successfully!');
  }
  async updateTodo(index) {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,
    {
      name: this.state.newTodo
    }
  );


    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({todos,editing: false, editingIndex: null, newTodo: ''});
    this.alert('Updated successfully');


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
         { this.state.notification && 
         <div className="alert alert-success mt-3">
          <p className="text-center">{this.state.notification}</p>
         </div>
         }
      <input 
        type="text" 
        name="todo"
        className="m-4 form-control"
        placeholder= "Add a new todo"
        value={this.state.newTodo}
        onChange={this.handleChange}
        />
        <button 
        onClick={this.state.editing ? this.updateTodo : this.addTodo} 
        className="btn-success mb-3 form-control"
        disabled={this.state.newTodo.length < 5}
        >
          {this.state.editing ? 'UPDATE TODO' : 'ADD TODO'}
        </button>

         {
           this.state.loading &&
           <img src={loadingGif} alt=""></img>
         }


        {
          (!this.state.editing || this.state.loading) && 
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
