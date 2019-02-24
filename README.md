# Run.rb

Run.rb is a tool to run Ruby code inside the browser.

This project **compiles Ruby to WebAssembly**. Inside `/src/emscripten` you'll find (currently) Ruby 2.6.0 and the tooling required to compile Ruby to WASM.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), but then we ejected it for WebAssembly reasons.

## Goals

- [x] Have an online interface to write and run Ruby code
- [ ] Include the Ruby Standard Library
- [ ] Add the ability to save "snippets" and share them
- [ ] Provide JS libraries for run.rb supported versions of Ruby
  - Something like: `<script src="https://runrb.io/ruby-2.6.1">` and `ruby("yourcode") // => Promise`
- [ ] You [tell us](https://github.com/jasoncharnes/run.rb/issues/new)

## Compiling Ruby to WASM

To compile Ruby into WebAssembly, you'll need [Docker](https://www.docker.com/products/docker-desktop) installed.

In the project directory, you can run: `make`

## Available scripts

To run the application locally, you'll need [NodeJS](http://nodejs.org) and [Yarn](http://yarnpkg.com) installed.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

**We sure could use some tests. 😉**

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
