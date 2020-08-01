import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
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
					<li>
						<NavLink className='nav-link' to='/login'>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink className='nav-link' to='/logout'>
							Logout
						</NavLink>
					</li>
					<li>
						<NavLink className='nav-link' to='/'>
							KH
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
