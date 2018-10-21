import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';
import axios from 'axios';
import Loader from 'react-loader-spinner'

class UsersIndex extends React.Component {
  constructor() {
    super();

    this.state = { };
  }
  componentDidMount() {
    var users = this.getUsers();
  }

  getUsers() {
    const this_ = this;
    axios.get('users.json', {
      headers: { 'X-CSRF-TOKEN': this.getCsrfToken() }
    })
    .then(function (response) {
      this_.setState({
        users: response.data
      });
    });
  }

  renderSpiner() {
    return(
      <Loader
         type="Puff"
         color="#00BFFF"
         height="100"
         width="100"
      />
    );
  }

  renderUsers(users) {
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { this.state.users.map((user) => this.renderTableRow(user)) }
          </tbody>
        </table>

        <UserForm />
      </div>
    );
  }

  render() {
    if (!this.state.users) {
      return this.renderSpiner();
    } else {
      return this.renderUsers(this.state.users);
    }
  }

  handleClick = (e) => {
    e.preventDefault();

    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;

    this.setState((prevState) => {
      return {
        users: [...prevState.users, {id: id, name: name}]
      }
    });

    this.clearInputs();
  }

  clearInputs() {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
  }

  renderTableRow(user) {
    return(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td><a href="#" onClick={this.removeUser(user)}>remove user</a></td>
      </tr>
    )
  }

  removeUser(deleteUser) {
    return((e) => {
      e.preventDefault();

      const this_ = this;

      axios.delete('users/' + deleteUser.id, {
        headers: { 'X-CSRF-TOKEN': this.getCsrfToken() }
      })
      .then(function (response) {
        this_.setState((prevState) => {
          return { users: prevState.users.filter((user) => { return user !== deleteUser }) }
        });
      });
    });
  }

  getCsrfToken() {
    return document.querySelector("meta[name=csrf-token]").content;
  }
}

export default UsersIndex;
