import React from 'react';
import ReactDOM from 'react-dom';

const Hello = props => (
  <div className='react-app-wrapper'>
    <h5 className='hello'>
      {props.message} {props.name}!
    </h5>
  </div>
)

// Render component with data
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('hello')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(<Hello {...data} />, node)
})
