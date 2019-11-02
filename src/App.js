import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Overview from "./Overview";
import loginScreen from "./loginScreen";
import Accountsview from "./AccountsView";
import theme from "./GUI/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/overview" component={Overview} />
              <Route exact path="/accountsview" component={Accountsview} />
              <Route exact path="/loginScreen" component={loginScreen} />
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
