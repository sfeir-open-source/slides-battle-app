import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Home } from "./components/home";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#433826",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
