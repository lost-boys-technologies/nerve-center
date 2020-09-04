import React from 'react';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import './Header.scss';

const Header = () => {
	const {user, firebase} = React.useContext(FirebaseContext);

	return (
		<nav className='nav-link-container'>
			<NavLink to='/' className='nav-link group-name'>
				Running Backs of Scotland
			</NavLink>
			<div className='links-container'>
				<ul className='nav-link-container'>
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
						<NavLink className='nav-link' to='/rules'>
							Rules
						</NavLink>
					</li>
					<li>
						<NavLink className='nav-link' to='/bets'>
							Bets
						</NavLink>
					</li>
					{user ? (
						<React.Fragment>
							<li>
								<NavLink className='user-name' to='/account'>
									{user.displayName}
								</NavLink>
							</li>
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
