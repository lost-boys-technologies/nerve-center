import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import './Header.scss';

const Header = () => {
	const {user, firebase} = React.useContext(FirebaseContext);

	// TODO need to add context with isAdmin
	const isAdmin = true;

	return (
		<nav className='nav-link-container'>
			<NavLink to='/' className='nav-link group-name'>
				Running Backs of Scotland
			</NavLink>
			<div className='links-container'>
				<ul className='nav-link-container'>
					{user ? (
						<React.Fragment>
							<li>
								<NavLink className='nav-link' to='/members'>
									Members
								</NavLink>
							</li>
							<li>
								<NavLink className='nav-link' to='/constitution'>
									Constitution
								</NavLink>
							</li>
							<li>
								<NavLink className='nav-link' to='/bets'>
									Bets
								</NavLink>
							</li>
							<li>
								<NavLink className='user-name' to='/account'>
									{user.displayName}
								</NavLink>
							</li>
							{isAdmin && (
								<li>
									<NavLink className='admin' to='/admin'>
										Admin
									</NavLink>
								</li>
							)}
							<li>
								<div className='nav-link' onClick={() => firebase.logout()}>
									logout
								</div>
							</li>
						</React.Fragment>
					) : (
						<li>
							<NavLink className='nav-link' to='/login'>
								login
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Header;
