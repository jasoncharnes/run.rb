import React, { Component } from "react";
import "./App.css";
import Logo from "./logo.svg";
import Play from "./play.svg";
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
      input: 'puts "Hello, playground!"',
      response: ""
    };
  }

  execute = () => {
    this.setState({ running: true, response: "Running..." }, () => {
      ruby(this.state.input).then(
        result => {
          this.updateResponse(result);
        },
        error => {
          this.handleError(error);
        }
      );
    });
  };

  handleError = error => {
    this.setState({ running: false, error: error });
  };

  updateResponse = response => {
    this.setState({
      running: false,
      error: null,
      response: response.output.map(chunk => chunk.output).join("")
    });
  };

  render() {
    const output = this.state.error ? this.state.error : this.state.response;
    const runClass = this.state.running ? "run active" : "run";

    return (
      <div className="app">
        <section className="info">
          <img alt="logo" className="logo" src={Logo} />
          <p>
            Currently running <strong>Ruby 2.6.0</strong>
          </p>
          <p>
            <strong>
              <span className="dark-grey">run</span>
              <span className="red">.rb</span>
            </strong>{" "}
            <small>
              ("<i>runner bee</i>")
            </small>{" "}
            allows you to run Ruby code in the browser. To get started, click
            the play button in the bottom of the editor.
          </p>
          <p>
            <small>
              <strong>
                *This project is still in it's very early stages. If you have
                any ideas or things you'd like to see, please reach out!
              </strong>
            </small>
          </p>
          <hr />
          <p>
            A project by{" "}
            <a href="https://twitter.com/jmcharnes">Jason Charnes</a> and{" "}
            <a href="https://willglynn.com">Will Glynn.</a>
          </p>
        </section>
        <section className="code">
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
            height="100%"
            width="100%"
            value={this.state.input}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2
            }}
          />
          <img
            alt="run"
            className={runClass}
            onClick={this.execute}
            src={Play}
          />
        </section>
        <section className="output">
          <pre>{output}</pre>
        </section>
      </div>
    );
  }
}

export default App;
