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
              <th style={{width:'150px'}}>Name</th>
              <th style={{width:'60px'}} />
            </tr>
          </thead>
          <tbody>
            { this.state.users.map((user) => this.renderTableRow(user)) }
          </tbody>
        </table>

        <UserForm onAddUser={this.handleClick} />
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

  handleClick = (user) => {
    this.setState((prevState) => {
      return {
        users: [...prevState.users, user]
      }
    });
  }

  renderTableRow(user) {
    if (user.state == "editing") {
      return this.renderInput(user);
    } else {
      return this.renderUser(user);
    }
  }

  renderInput(user) {
    return(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td><input type="text" name="user[name]" id="user_name" defaultValue={user.name} /></td>
        <td><input type="submit" onClick={this.saveUser.bind(this, user)} value="Update" /></td>
        <td><a href="#" onClick={this.cancelEdit(user)}>cancel</a></td>
      </tr>
    )
  }

  renderUser(user) {
    return(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td><a href="#" onClick={this.editUser(user)}>edit</a></td>
        <td><a href="#" onClick={this.removeUser(user)}>remove</a></td>
      </tr>
    )
  }

  saveUser = (user, e) => {
    e.preventDefault();

    var name = document.getElementById('user_name').value;

    const this_ = this;

    axios.patch('users/' + user.id,
      {
        user: {
          name: name
        }
      },
      {
        headers: { 'X-CSRF-TOKEN': this_.getCsrfToken() }
      }
    )
    .then((response) => {
      user.name = name;
      user.state = null;
      this_.setState((prevState) => {
        return { users: prevState.users }
      })
    })
  }

  editUser(user) {
    return((e) => {
      user.state = "editing";
      this.setState((prevState) => {
        return { users: prevState.users }
      })
    })
  }

  cancelEdit(user) {
    return((e) => {
      user.state = null;
      this.setState((prevState) => {
        return { users: prevState.users }
      })
    })
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
