import React, { Component } from "react";
import "./App.css";
import { ruby } from "./Ruby";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compiling: false,
      error: null,
      input: "",
      response: ""
    };
  }

  compile = () => {
    this.setState({ compiling: true, response: "" }, () => {
      ruby(this.state.input, this.updateResponse, this.handleError);
    });
  };

  handleError = error => {
    this.setState({ compiling: false, error: error.join("") });
  };

  updateResponse = response => {
    this.setState({
      compiling: false,
      error: null,
      response: response.join("")
    });
  };

  render() {
    const compiledResult = this.state.error
      ? this.state.error
      : this.state.response;

    return (
      <div className="App">
        <header className="App-header">
          <textarea
            onChange={evt => this.setState({ input: evt.target.value })}
            value={this.state.input}
          />
          <textarea readOnly={true} value={compiledResult} />
          <button disabled={this.state.compiling} onClick={this.compile}>
            Run Ruby
          </button>
        </header>
      </div>
    );
  }
}

export default App;
