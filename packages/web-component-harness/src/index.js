/* global document, HTMLElement */

import React from "react";
import ReactDOM from "react-dom";

import { processAttributes } from "./helpers";

export default (ReactRootComponent, componentName) => {
  const prototype = Object.create(HTMLElement.prototype);

  prototype.createdCallback = function() {};
  prototype.attachedCallback = function() {
    ReactDOM.render(
      <ReactRootComponent {...processAttributes(this.attributes)} />,
      this
    );
  };
  prototype.attributeChangedCallback = function() {};
  prototype.detachedCallback = function() {};

  document.registerElement(componentName, {
    prototype
  });
};
