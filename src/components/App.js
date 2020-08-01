import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Navigation/Header';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import ForgotPassword from './Auth/ForgotPassword';
import BetsLists from './Bets/BetsLists';
import Members from './StaticPages/Members';
import Homepage from './StaticPages/Homepage';
import Constitution from './StaticPages/Constitution';
import Rules from './StaticPages/Rules';

import './App.scss';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path='/' component={Homepage} render={() => <Redirect to='/' />} />
				<Route path='/members' component={Members} />
				<Route path='/constitution' component={Constitution} />
				<Route path='/rules' component={Rules} />
				<Route path='/bets' component={BetsLists} />
				<Route path='/login' component={Login} />
				<Route path='/logout' component={Logout} />
				<Route path='/forgot' component={ForgotPassword} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
