import React, { Component } from "react";
import "./App.css";
import { ruby } from "./Ruby";
import AceEditor from "react-ace";

import "brace/mode/ruby";
import "brace/theme/github";

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
      <div className="app">
        <div className="code">
          <AceEditor
            className="editor"
            mode="ruby"
            theme="github"
            onLoad={this.onLoad}
            onChange={value => {
              this.setState({ input: value });
            }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.input}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2
            }}
          />
          <textarea readOnly={true} value={compiledResult} />
        </div>
        <button disabled={this.state.compiling} onClick={this.compile}>
          Run Ruby
        </button>
      </div>
    );
  }
}

export default App;
