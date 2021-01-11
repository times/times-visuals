module.exports = componentName => `<!-- Main component -->
<dom-module id="${componentName}">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js"></script>

  <script src="./index.js"></script>
</dom-module>`;
