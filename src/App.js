import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Overview from "./Overview";
import Accountsview from "./AccountsView";
import theme from "./GUI/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { UserContext } from "./UserContext";
import LoginScreen from "./loginScreen";
import AdminPage from "./adminPage"
import ServerInterface from "./ServerInterface"

class App extends React.Component {
  constructor(props) {
    super(props);

  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <ThemeProvider theme={theme}>
          <div>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/overview" component={Overview} />
                <Route exact path="/accountsview" component={Accountsview} />
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/admin" component={AdminPage} />
                <Route render={() => <div>404 Not found</div>} />}
              </Switch>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    );
  }
}

export default App;
