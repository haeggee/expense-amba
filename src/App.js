import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Overview from './Overview';
import Accountsview from './AccountsView'


class App extends React.Component {
	render() {
		return (	
		    <div>
			<BrowserRouter>
			<Switch> 
			  <Route exact path='/' component={Home}/>
			  <Route exact path='/overview' component={Overview}/>
			  <Route exact path='/accountsview' component={Accountsview}/>
			</Switch>
			</BrowserRouter>
		    </div>
		  );
	}
}

export default App;
