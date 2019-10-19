import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Overview from './Overview';
import Profileview from './Profileview';

class App extends React.Component {
	render() {
		return (	
		    <div>
			<BrowserRouter>
			<Switch> 
			  <Route exact path='/' component={Home}/>
			  <Route exact path='/overview' component={Overview}/>
			  <Route exact path='/profileview' component={Profileview}/>
			</Switch>
	      	        </BrowserRouter>		
		    </div>
		  );
	}
}

export default App;
