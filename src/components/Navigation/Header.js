import React from 'react';
import { NavLink } from 'react-router-dom';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

import './Header.scss';

const Header = () => {
	return (
		<nav className='nav-link-container'>
			<NavLink to='/' className='nav-link group-name'>
				Running Backs of Scotland
			</NavLink>
			<div className='links-container'>
				<SignedInLinks />
			</div>
		</nav>
	);
};

export default Header;
