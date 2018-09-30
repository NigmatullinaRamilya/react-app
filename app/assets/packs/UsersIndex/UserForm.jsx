import React from 'react';
import ReactDOM from 'react-dom';

class UserForm extends React.Component {
  render() {

    return(
      <div>
        <form action="/users" method="POST">
          <input type="hidden" name="authenticity_token" value={this.getCsrfToken()} />

          <label>Name
            <input type="text" name="user[name]"/>
          </label>
          <br/>

          <input type="submit" value="Add user" />
        </form>
      </div>
    );
  }

  getCsrfToken() {
    return document.querySelector("meta[name=csrf-token]").content;
  }
}

export default UserForm;
