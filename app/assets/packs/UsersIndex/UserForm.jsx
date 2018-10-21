import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserForm extends React.Component {
  render() {
    return(
      <div>
        <form action="/users" method="POST">
          <input type="hidden" name="authenticity_token" value={this.getCsrfToken()} />

          <label>Name
            <input type="text" name="user[name]" id="user_name"/>
          </label>
          <br/>

          <input type="submit" onClick={this.handleClick} value="Add user" />
        </form>
      </div>
    );
  }

  handleClick = (e) => {
    e.preventDefault();

    const { onAddUser } = this.props;

    var name = document.getElementById('user_name').value;

    axios.post('/users',
      {
        user: {
          name: name
        }
      },
      {
        headers: { 'X-CSRF-TOKEN': this.getCsrfToken() }
      }
    )
    .then((response) => {
      onAddUser(response.data);
      this.clearInputs();
    })
  }

  getCsrfToken() {
    return document.querySelector("meta[name=csrf-token]").content;
  }

  clearInputs() {
    document.getElementById('user_name').value = "";
  }
}

export default UserForm;
