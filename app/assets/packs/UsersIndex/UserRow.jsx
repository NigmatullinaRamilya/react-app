import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserRow extends React.Component {
  render() {
    const { user } = this.props;

    if (user.status == "editing") {
      return this.renderForm(user);
    } else {
      return this.renderUser(user);
    }
  }

  renderForm(user) {
    return(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td><input type="text" name="user[name]" id="user_name" defaultValue={user.name} /></td>
        <td><input type="submit" onClick={this.handleClick.bind(this, user)} value="Update" /></td>
        <td><a href="#" onClick={this.updateUser.bind(this, user, {})}>cancel</a></td>
      </tr>
    )
  }

  renderUser(user) {
    return(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td><a href="#" onClick={this.updateUser.bind(this, user, { status: "editing" })}>edit</a></td>
        <td><a href="#" onClick={this.deleteUser.bind(this, user)}>remove</a></td>
      </tr>
    )
  }

  handleClick = (user) => {
    var name = document.getElementById('user_name').value;

    axios.patch(
      'users/' + user.id,
      { user: { name: name } },
      { headers: { 'X-CSRF-TOKEN': this.getCsrfToken() } }
    )
    .then((response) => {
      this.updateUser(user, { name: name });
    })
  }

  updateUser = (user, attrs) => {
    var { onUpdate } = this.props;

    if (attrs["name"] !== undefined) {
      user.name = attrs["name"]
    }
    user.status = attrs["status"];

    onUpdate(user);
  }

  deleteUser = (user) => {
    var { onDelete } = this.props;

    axios.delete(
      'users/' + user.id,
      { headers: { 'X-CSRF-TOKEN': this.getCsrfToken() } }
    )
    .then((response) => {
      onDelete(user);
    });
  }

  // TODO: Move to helper 
  getCsrfToken() {
    return document.querySelector("meta[name=csrf-token]").content;
  }
}

export default UserRow;
