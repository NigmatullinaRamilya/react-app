import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import UserForm from './UserForm';
import UserRow from './UserRow';

class UsersIndex extends React.Component {
  constructor() {
    super();

    this.state = { };
  }

  componentDidMount() {
    var users = this.getUsers();
  }

  render() {
    if (!this.state.users) {
      return this.renderSpiner();
    } else {
      return this.renderUsers(this.state.users);
    }
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
              <th style={{width:'150px'}}>Name</th>
              <th style={{width:'60px'}} />
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user) =>
                <UserRow user={user} key={user.id} onUpdate = {this.updateUser} onDelete={this.deleteUser} />
              )
            }
          </tbody>
        </table>

        <UserForm onAddUser={this.handleClick} />
      </div>
    );
  }

  handleClick = (user) => {
    this.setState((prevState) => {
      return {
        users: [...prevState.users, user]
      }
    });
  }

  updateUser = (user) => {
    this.setState((prevState) => {
      return(users: prevState.users )
    })
  }

  deleteUser = (deletedUser) => {
    this.setState((prevState) => { users: prevState.users.filter((user) => user !== deletedUser) })
  }

  getCsrfToken() {
    return document.querySelector("meta[name=csrf-token]").content;
  }
}

export default UsersIndex;
