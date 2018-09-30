import React from 'react';
import ReactDOM from 'react-dom';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: props.users
    }
  }

  render() {
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

        <label>Id
          <input type="text" id="id"/>
        </label>
        <br/>

        <label>Name
          <input type="text" id="name"/>
        </label>
        <br/>

        <a href="#" onClick={this.handleClick}>Add row</a>
      </div>
    );
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

      this.setState((prevState) => {
        return { users: prevState.users.filter((user) => { return user !== deleteUser }) }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('users');
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(<User {...data}/>, node)
})
