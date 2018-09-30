import React from 'react';
import ReactDOM from 'react-dom';
import UsersIndex from "./UsersIndex"

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('users');
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(<UsersIndex {...data}/>, node)
})
