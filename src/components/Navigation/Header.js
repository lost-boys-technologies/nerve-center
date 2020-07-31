import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
	return (
		<nav className='nav-link-container'>
			<NavLink to='/' className='nav-link group-name'>
				Running Backs of Scotland
			</NavLink>
		</nav>
	);
};

export default Header;
