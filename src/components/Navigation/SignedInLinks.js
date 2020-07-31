import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const SignedInLinks = () => {
	return (
		<ul className='nav-link-container'>
			<li>
				<NavLink className='nav-link' to='/members'>
					Members
				</NavLink>
			</li>
			{/* <li>
				<NavLink className='nav-link' to='/'>
					Constitution
				</NavLink>
			</li> */}
			{/* <li>
				<NavLink className='nav-link' to='/'>
					Rules
				</NavLink>
			</li> */}
			<li>
				<NavLink className='nav-link' to='/bets'>
					Bets
				</NavLink>
			</li>
			{/* <li>
				<NavLink className='nav-link' to='/'>
					Sign Out
				</NavLink>
			</li> */}
			{/* <li>
				<NavLink className='nav-link' to='/'>
					KH
				</NavLink>
			</li> */}
		</ul>
	);
};

export default SignedInLinks;
