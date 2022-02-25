import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Navigation/Header';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import useAuth from './Auth/useAuth';
import firebase, { FirebaseContext } from '../firebase';

// Bets
import BetsLists from './Bets/BetsLists';
import CreateBet from './Bets/CreateBet';

// My Account
import Account from './Account';

// Admin
import Admin from './Admin';

// Static Pages
import Members from './StaticPages/Members';
import Homepage from './StaticPages/Homepage';
import Constitution from './StaticPages/Constitution';
// import NotFound from './StaticPages/404';

import './App.scss';

const App = () => {
	const user = useAuth();

	return (
		<BrowserRouter>
			<FirebaseContext.Provider value={{ user, firebase }}>
				<div className='app-container'>
					<Header />
				</div>
				<div className='route-container'>
					<Switch>
						{user && (
							<React.Fragment>
								<Route exact path='/' component={Homepage} render={() => <Redirect to='' />} />
								<Route path='/members' component={Members} />
								<Route path='/constitution' component={Constitution} />
								<Route path='/bets' component={BetsLists} />
								<Route path='/create' component={CreateBet} />
								<Route path='/account' component={Account} />
								<Route path='/admin' component={Admin} />
							</React.Fragment>
						)}
						<Route path='/login' component={Login} />
						<Route path='/forgot' component={ForgotPassword} />
						{/* <Route component={NotFound}/> */}
					</Switch>
				</div>
			</FirebaseContext.Provider>
		</BrowserRouter>
	);
};

export default App;
