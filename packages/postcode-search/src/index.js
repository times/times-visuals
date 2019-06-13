import React from "react";

import * as postcodesIo from "./providers/postcodes-io";

import { Container, TextInputContainer, Message } from "./style";

class PostcodeSearch extends React.Component {
  state = {
    loadingState: "none",
    value: ""
  };

  static defaultProps = {
    provider: "postcodes.io"
  };

  getLoadMethod = () => {
    const { provider, onRequest } = this.props;

    switch (provider) {
      case "postcodes.io":
        return postcodesIo.loadPostcode;
      case "custom":
        if (!onRequest)
          return () =>
            Promise.reject(
              new Error(
                "Please provide the `onRequest` prop when using a custom provider"
              )
            );
        return onRequest;
      default:
        return () =>
          Promise.reject(new Error("Please supply a valid provider"));
    }
  };

  handleKeypress = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onLoad, onError, provider } = this.props;

    this.setState({
      loadingState: "pending"
    });

    const method = this.getLoadMethod();

    method(this.state.value)
      .then(result => {
        this.setState({
          loadingState: "success"
        });

        onLoad(result);
      })
      .catch(e => {
        this.setState({
          loadingState: "error"
        });

        onError(e);
      });

    this.refs.searchInput.blur();
  };

  render() {
    const { value, result, loadingState } = this.state;

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            name="location"
            autoComplete="off"
            ref="searchInput"
            placeholder="Search for a postcode"
            value={this.state.value || ""}
            onChange={this.handleKeypress}
          />

          <input
            type="submit"
            className="Button"
            value="Search"
            disabled={loadingState === "pending"}
          />
        </form>

        {loadingState === "error" && (
          <Message>
            Sorry, there was an error looking up your postcode, please try again
          </Message>
        )}
      </Container>
    );
  }
}

export default PostcodeSearch;
