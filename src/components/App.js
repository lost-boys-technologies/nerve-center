import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Navigation/Header';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import BetsLists from './Bets/BetsLists';

import Members from './StaticPages/Members';
import Homepage from './StaticPages/Homepage';

import './App.scss';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path='/' component={Homepage} render={() => <Redirect to='/' />} />
				<Route path='/login' component={Login} />
				<Route path='/forgot' component={ForgotPassword} />
				<Route path='/bets' component={BetsLists} />
				<Route path='/members' component={Members} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
