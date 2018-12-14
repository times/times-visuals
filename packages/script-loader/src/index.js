import React from "react";

class ScriptLoader extends React.Component {
  state = {
    loaded: false
  };

  componentWillMount() {
    const { src } = this.props;
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.async = true;
    script.src = src;
    script.onload = () =>
      this.setState(() => ({
        loaded: true
      }));

    head.appendChild(script);
  }

  render() {
    const { children } = this.props;
    const { loaded } = this.state;

    if (!loaded) return null;

    return children();
  }
}

export default ScriptLoader;
