import React from 'react';
import ReactDOM from 'react-dom';

class Checker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    }
  }

  renderTextInput() {
    if (this.state.checked) {
      return (
        <input type="text"/>
      );
    }
  }

  render() {
    return(
      <div>
        <input type="checkbox" onClick={this.handleClick} />
        {this.renderTextInput()}
      </div>
    );
  }

  handleClick = () => {
    const { checked } = this.state;

    this.setState({
      checked: !checked
    });
  }
}

// Render component with data
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('checker')

  ReactDOM.render(<Checker />, node)
})
