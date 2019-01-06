import React, { Component } from "react";
import "./App.css";
import ruby from "./Ruby";
import AceEditor from "react-ace";

import "brace/mode/ruby";
import "brace/theme/github";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      error: null,
      input: "",
      response: ""
    };
  }

  execute = () => {
    this.setState({ running: true, response: "" }, () => {
      ruby(this.state.input)
        .then((result) => {
          this.updateResponse(result);
        }, (error) => {
          this.handleError(error);
        });
    });
  };

  handleError = error => {
    this.setState({ running: false, error: error });
  };

  updateResponse = response => {
    this.setState({
      running: false,
      error: null,
      response: response.output.map((chunk) => chunk.data).join("")
    });
  };

  render() {
    const output = this.state.error
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
          <textarea readOnly={true} value={output} />
        </div>
        <button disabled={this.state.running} onClick={this.execute}>
          Run Ruby
        </button>
      </div>
    );
  }
}

export default App;
